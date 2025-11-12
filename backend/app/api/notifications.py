from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.schemas.notification import Notification, NotificationCreate, NotificationUpdate
from app.models.notification import Notification as NotificationModel
from app.utils.notifications import send_notification

router = APIRouter()

@router.post("/", response_model=Notification, status_code=status.HTTP_201_CREATED)
def create_notification(notification: NotificationCreate, db: Session = Depends(get_db)):
    db_notification = NotificationModel(**notification.dict())
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    
    # Send the notification
    send_notification(
        user_id=db_notification.user_id,
        notification_type=db_notification.type,
        title=db_notification.title,
        message=db_notification.message,
        recipient=db_notification.recipient
    )
    
    return db_notification

@router.get("/", response_model=List[Notification])
def read_notifications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    notifications = db.query(NotificationModel).offset(skip).limit(limit).all()
    return notifications

@router.get("/{notification_id}", response_model=Notification)
def read_notification(notification_id: int, db: Session = Depends(get_db)):
    db_notification = db.query(NotificationModel).filter(NotificationModel.id == notification_id).first()
    if db_notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")
    return db_notification

@router.put("/{notification_id}", response_model=Notification)
def update_notification(notification_id: int, notification: NotificationUpdate, db: Session = Depends(get_db)):
    db_notification = db.query(NotificationModel).filter(NotificationModel.id == notification_id).first()
    if db_notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    update_data = notification.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_notification, key, value)
    
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

@router.delete("/{notification_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_notification(notification_id: int, db: Session = Depends(get_db)):
    db_notification = db.query(NotificationModel).filter(NotificationModel.id == notification_id).first()
    if db_notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    db.delete(db_notification)
    db.commit()
    return