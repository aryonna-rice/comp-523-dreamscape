from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import User
from ..entities import UserEntity

class UserService:

    _session: Session

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def get(self, device_id: int) -> User | None:
        query = select(UserEntity).where(UserEntity.device_id == device_id)
        user_entity: UserEntity = self._session.scalar(query)
        if user_entity is None:
            return None
        else:
            model = user_entity.to_model()
            return model
        
    def save(self, user: User) -> User | None:
        '''Function used to both add to the database and update database'''
        if user.id:
            entity = self._session.get(UserEntity, user.id)
            entity.update(user)
        else:
            entity = UserEntity.from_model(user)
            self._session.add(entity)
        self._session.commit()
        return entity.to_model()