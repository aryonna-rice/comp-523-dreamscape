"""A data model for a registered user."""

from pydantic import BaseModel
from datetime import date

class User(BaseModel):
    id: int | None
    first_name: str
    last_name: str
    # This would be how we associate a device with a name and id, not sure what the data type will be here
    device_id: int
    dob: str
    gender: str | None