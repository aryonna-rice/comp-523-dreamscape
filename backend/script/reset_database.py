'''Script for resetting the database with consistent data'''

from sqlalchemy import text
from sqlalchemy.orm import Session
from ..database import engine
from .. import entities

# Reset Tables
entities.EntityBase.metadata.drop_all(engine)
entities.EntityBase.metadata.create_all(engine)

# Insert dev data

# Add Users
with Session(engine) as session:
    from .dev_data import users
    to_entity = entities.UserEntity.from_model
    session.add_all([to_entity(model) for model in users.models])
    session.execute(text(f'ALTER SEQUENCE {entities.UserEntity.__table__}_id_seq RESTART WITH {len(users.models) + 1}'))
    session.commit()