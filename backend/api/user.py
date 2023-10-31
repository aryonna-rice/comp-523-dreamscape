'''API methods for adding, removing, and editing users in the database'''

from fastapi import APIRouter, Depends
from ..services import UserService
from ..models import User

# Choosing this prefix for now, can change it later if need be
api = APIRouter(prefix="/api/user")

@api.get("", response_model=User | None, tags=['User'])
def get(device_id: int, user_svc: UserService = Depends()):
    return user_svc.get(device_id)

@api.get("/list", response_model=list[User], tags=['User'])
def list_users(user_svc: UserService = Depends()):
    return user_svc.list_users()

@api.get("/search", response_model=list[User], tags=['User'])
def search(first_name: str | None = None, last_name: str | None = None, user_svc: UserService = Depends()):
    return user_svc.search_name(first_name, last_name)

@api.post("", response_model=User | None, tags=['User'])
def register(user: User, user_svc: UserService = Depends()):
    return user_svc.add(user)

@api.put("", response_model=User | None, tags=['User'])
def update(user: User, user_svc: UserService = Depends()):
    return user_svc.update(user)