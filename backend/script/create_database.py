'''Script for creating a database during development'''

import sqlalchemy
from .. import entities

# Use a database file for testing
engine = sqlalchemy.create_engine("sqlite+pysqlite:///database.db", echo=True)

entities.EntityBase.metadata.create_all(engine)