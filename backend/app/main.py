from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routers
from app.core.config import settings
from app.utils.scheduler import scheduler

# Import all models to ensure they are registered with SQLAlchemy
from app.models.user import User
from app.models.task import Task
from app.models.server import Server
from app.models.security import SecurityAlert
from app.models.vault import VaultItem
from app.models.notification import Notification
from app.models.automation import AutomationTask

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="InfraPilot - Your Infrastructure, On Autopilot",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(routers.api_router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    # Start the task scheduler
    scheduler.start()

@app.on_event("shutdown")
async def shutdown_event():
    # Stop the task scheduler
    scheduler.stop()

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "message": "InfraPilot is running smoothly!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)