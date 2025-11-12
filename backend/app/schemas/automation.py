from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AutomationTaskBase(BaseModel):
    name: str
    description: Optional[str] = None
    task_type: str
    schedule: str
    enabled: Optional[bool] = True

class AutomationTaskCreate(AutomationTaskBase):
    pass

class AutomationTaskUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    task_type: Optional[str] = None
    schedule: Optional[str] = None
    enabled: Optional[bool] = None
    last_run: Optional[datetime] = None
    next_run: Optional[datetime] = None

class AutomationTaskInDBBase(AutomationTaskBase):
    id: int
    last_run: Optional[datetime] = None
    next_run: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime]
    user_id: int

    class Config:
        orm_mode = True

class AutomationTask(AutomationTaskInDBBase):
    pass