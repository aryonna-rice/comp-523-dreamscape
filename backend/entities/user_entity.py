"""User accounts for registered users"""

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from .entity_base import EntityBase
from typing import Self
from ..models import User

class UserEntity(EntityBase):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    first_name: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    last_name: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    device_id: Mapped[int] = mapped_column(Integer, unique=True, index=True)
    dob: Mapped[str] = mapped_column(String(16), nullable=False, default='')
    gender: Mapped[str] = mapped_column(String(32), nullable=True)

    @classmethod
    def from_model(cls, model: User) -> Self:
        return cls(
            id = model.id,
            first_name = model.first_name,
            last_name = model.last_name,
            device_id = model.device_id,
            dob = model.dob,
            gender = model.gender,
        )
    
    def to_model(self) -> User:
        return User(
            id = self.id,
            first_name = self.first_name,
            last_name = self.last_name,
            device_id = self.device_id,
            dob = self.dob,
            gender = self.gender,
        )
    
    def update(self, model: User) -> None:
        self.first_name = model.first_name
        self.last_name = model.last_name
        self.gender = model.gender