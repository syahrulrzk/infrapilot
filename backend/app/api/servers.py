from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.server import Server, ServerCreate, ServerUpdate
from app.models.server import Server as ServerModel

router = APIRouter()

@router.post("/", response_model=Server, status_code=status.HTTP_201_CREATED)
def create_server(server: ServerCreate, db: Session = Depends(get_db)):
    db_server = ServerModel(**server.dict())
    db.add(db_server)
    db.commit()
    db.refresh(db_server)
    return db_server

@router.get("/", response_model=List[Server])
def read_servers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    servers = db.query(ServerModel).offset(skip).limit(limit).all()
    return servers

@router.get("/{server_id}", response_model=Server)
def read_server(server_id: int, db: Session = Depends(get_db)):
    db_server = db.query(ServerModel).filter(ServerModel.id == server_id).first()
    if db_server is None:
        raise HTTPException(status_code=404, detail="Server not found")
    return db_server

@router.put("/{server_id}", response_model=Server)
def update_server(server_id: int, server: ServerUpdate, db: Session = Depends(get_db)):
    db_server = db.query(ServerModel).filter(ServerModel.id == server_id).first()
    if db_server is None:
        raise HTTPException(status_code=404, detail="Server not found")
    
    update_data = server.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_server, key, value)
    
    db.add(db_server)
    db.commit()
    db.refresh(db_server)
    return db_server

@router.delete("/{server_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_server(server_id: int, db: Session = Depends(get_db)):
    db_server = db.query(ServerModel).filter(ServerModel.id == server_id).first()
    if db_server is None:
        raise HTTPException(status_code=404, detail="Server not found")
    
    db.delete(db_server)
    db.commit()
    return