import pytest

from sqlalchemy.orm import Session
from datetime import date
from ...models import User
from ...entities import UserEntity
from ...services import UserService

# Mock data
user1 = User(id=0, first_name="First", last_name="Patient", device_id=0000, dob=date(1950, 4, 24), gender="Male")

user2 = User(id=1, first_name="Second", last_name="Patient", device_id=1280, dob=date(1963, 7, 1), gender="Female")

user3 = User(id=2, first_name="Third", last_name="Patient", device_id=2789, dob=date(1947, 11, 15), gender=None)

user4 = User(id=3, first_name="Patricia", last_name="Stein", device_id=2548, dob=date(1970, 7, 26), gender="Female")

user5 = User(id=4, first_name="Mark", last_name="Rober", device_id=4850, dob=date(1926, 9, 11), gender="Male")

models = [
    user1, 
    user2, 
    user3,
    user4,
    user5
]

@pytest.fixture(autouse=True)
def setup(test_session: Session):
    # Bootstrap user data
    to_entity = UserEntity.from_model
    test_session.add_all([to_entity(model) for model in models])

    test_session.commit()
    yield

# Set up service
def user_service(test_session: Session):
    return UserService(test_session)