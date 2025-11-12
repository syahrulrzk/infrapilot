from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from pydantic import BaseModel
from app.database.session import get_db
from app.schemas.user import User
from app.models.user import User as UserModel
from app.core.security import verify_password, create_access_token
from app.core.config import settings

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login", response_model=dict)
def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    # Find user by username or email
    user = db.query(UserModel).filter(
        (UserModel.username == login_request.username) | 
        (UserModel.email == login_request.username)
    ).first()
    
    # Check if user exists and password is correct
    if not user or not verify_password(login_request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "user_id": user.id}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_active": user.is_active,
            "is_superuser": user.is_superuser
        }
    }