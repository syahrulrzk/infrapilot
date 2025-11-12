from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.automation import AutomationTask, AutomationTaskCreate, AutomationTaskUpdate
from app.models.automation import AutomationTask as AutomationTaskModel

router = APIRouter()

@router.post("/", response_model=AutomationTask, status_code=status.HTTP_201_CREATED)
def create_automation_task(task: AutomationTaskCreate, db: Session = Depends(get_db)):
    db_task = AutomationTaskModel(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/", response_model=List[AutomationTask])
def read_automation_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = db.query(AutomationTaskModel).offset(skip).limit(limit).all()
    return tasks

@router.get("/{task_id}", response_model=AutomationTask)
def read_automation_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(AutomationTaskModel).filter(AutomationTaskModel.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Automation task not found")
    return db_task

@router.put("/{task_id}", response_model=AutomationTask)
def update_automation_task(task_id: int, task: AutomationTaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(AutomationTaskModel).filter(AutomationTaskModel.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Automation task not found")
    
    update_data = task.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)
    
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_automation_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(AutomationTaskModel).filter(AutomationTaskModel.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Automation task not found")
    
    db.delete(db_task)
    db.commit()
    return