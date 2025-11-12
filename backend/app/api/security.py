from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.security import SecurityAlert, SecurityAlertCreate, SecurityAlertUpdate
from app.models.security import SecurityAlert as SecurityAlertModel

router = APIRouter()

@router.post("/", response_model=SecurityAlert, status_code=status.HTTP_201_CREATED)
def create_security_alert(alert: SecurityAlertCreate, db: Session = Depends(get_db)):
    db_alert = SecurityAlertModel(**alert.dict())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

@router.get("/", response_model=List[SecurityAlert])
def read_security_alerts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    alerts = db.query(SecurityAlertModel).offset(skip).limit(limit).all()
    return alerts

@router.get("/{alert_id}", response_model=SecurityAlert)
def read_security_alert(alert_id: int, db: Session = Depends(get_db)):
    db_alert = db.query(SecurityAlertModel).filter(SecurityAlertModel.id == alert_id).first()
    if db_alert is None:
        raise HTTPException(status_code=404, detail="Security alert not found")
    return db_alert

@router.put("/{alert_id}", response_model=SecurityAlert)
def update_security_alert(alert_id: int, alert: SecurityAlertUpdate, db: Session = Depends(get_db)):
    db_alert = db.query(SecurityAlertModel).filter(SecurityAlertModel.id == alert_id).first()
    if db_alert is None:
        raise HTTPException(status_code=404, detail="Security alert not found")
    
    update_data = alert.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_alert, key, value)
    
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

@router.delete("/{alert_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_security_alert(alert_id: int, db: Session = Depends(get_db)):
    db_alert = db.query(SecurityAlertModel).filter(SecurityAlertModel.id == alert_id).first()
    if db_alert is None:
        raise HTTPException(status_code=404, detail="Security alert not found")
    
    db.delete(db_alert)
    db.commit()
    return