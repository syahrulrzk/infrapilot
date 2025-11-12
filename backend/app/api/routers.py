from fastapi import APIRouter
from app.api import users, tasks, servers, security, vault, auth, notifications, automation

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(servers.router, prefix="/servers", tags=["servers"])
api_router.include_router(security.router, prefix="/security", tags=["security"])
api_router.include_router(vault.router, prefix="/vault", tags=["vault"])
api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
api_router.include_router(automation.router, prefix="/automation", tags=["automation"])
# We'll add more routers here as we create them
