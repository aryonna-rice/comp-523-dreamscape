'''API methods for adding, removing, and editing users in the database'''

from fastapi import APIRouter, Depends
from ..services import UserService
from ..models import User

# Choosing this prefix for now, can change it later if need be
api = APIRouter(prefix="/api/user")

@api.get("", response_model=User | None, tags=['User'])
def get(device_id: int, user_svc: UserService = Depends()):
    return user_svc.get(device_id)

@api.post("", response_model=User | None, tags=['User'])
def register(user: User, user_svc: UserService = Depends()):
    return user_svc.save(user)

@api.put("", response_model=User | None, tags=['User'])
def update(user: User, user_svc: UserService = Depends()):
    return user_svc.save(user)