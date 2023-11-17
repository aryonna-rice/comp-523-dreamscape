import pytest
import os

from sqlalchemy import create_engine, Engine
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError, ProgrammingError

engine_str = "sqlite+pysqlite:///database.db"

def reset_database():
    if os.path.exists("database.db"):
        os.remove("database.db")
    else:
        return
    create_engine(engine_str)

@pytest.fixture(scope='session')
def test_engine() -> Engine:
    reset_database()
    return create_engine(engine_str)

@pytest.fixture(scope='function')
def test_session(test_engine: Engine):
    from .. import entities
    entities.EntityBase.metadata.drop_all(test_engine)
    entities.EntityBase.metadata.create_all(test_engine)
    session = Session(test_engine)
    try:
        yield session
    finally:
        session.close()