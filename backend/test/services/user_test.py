import pytest

from sqlalchemy.orm import Session
from ...models import User
from ...entities import UserEntity
from ...services import UserService

# Mock data
user1 = User(id=0, first_name="First", last_name="Patient", device_id=0000, dob="4/24/1950", gender="Male")

user2 = User(id=1, first_name="Second", last_name="Patient", device_id=1280, dob="7/1/1963", gender="Female")

user3 = User(id=2, first_name="Third", last_name="Patient", device_id=2789, dob="11/15/1947", gender=None)

user4 = User(id=3, first_name="Patricia", last_name="Stein", device_id=2548, dob="7/26/1970", gender="Female")

user5 = User(id=4, first_name="Mark", last_name="Rober", device_id=4850, dob="9/11/1926", gender="Male")

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
@pytest.fixture()
def user_service(test_session: Session):
    return UserService(test_session)

def test_get1(user_service: UserService):
    query_result = user_service.get(user2.device_id)
    assert query_result == user2

def test_get2(user_service: UserService):
    query_result = user_service.get(user5.device_id)
    assert query_result == user5

def test_search_name_first(user_service: UserService):
    query_result = user_service.search_name(first_name=user1.first_name, last_name=None)
    assert query_result == [user1]

def test_search_name_last(user_service: UserService):
    query_result = user_service.search_name(first_name=None, last_name=user4.last_name)
    assert query_result == [user4]

def test_search_name_both(user_service: UserService):
    query_result = user_service.search_name(first_name=user5.first_name, last_name=user5.last_name)
    assert query_result == [user5]

def test_search_name_multi_result(user_service: UserService):
    query_result = user_service.search_name(first_name=None, last_name=user1.last_name)
    assert query_result == [user1, user2, user3]

def test_search_name_no_result(user_service: UserService):
    query_result = user_service.search_name(first_name="No name", last_name=None)
    assert query_result == []

def test_list(user_service: UserService):
    query_result = user_service.list_users()
    assert query_result == models

def test_add(user_service: UserService):
    new_user = User(id=5, first_name="Melissa", last_name="Monroe", device_id=9838, gender="Female", dob="6/4/1958")
    add_result = user_service.add(new_user)
    assert add_result == new_user
    query_result = user_service.get(new_user.device_id)
    assert query_result == new_user

def test_update(user_service: UserService):
    user_to_update = user_service.get(user5.device_id)
    user_to_update.last_name = "Roberts"
    update_result = user_service.update(user_to_update)
    assert update_result == user_to_update
    query_result = user_service.get(user_to_update.device_id)
    assert query_result == user_to_update

def test_add_empty_first_name(user_service: UserService):
    new_user = User(id=None, first_name="", last_name="Here", device_id=5811, gender=None, dob="4/17/2000")
    try:
        user_service.add(new_user)
        assert False
    except ValueError:
        assert True

def test_add_empty_last_name(user_service: UserService):
    new_user = User(id=None, last_name="", first_name="Here", device_id=5811, gender=None, dob="4/17/2000")
    try:
        user_service.add(new_user)
        assert False
    except ValueError:
        assert True

def test_add_empty_both_names(user_service: UserService):
    new_user = User(id=None, last_name="", first_name="", device_id=5811, gender=None, dob="4/17/2000")
    try:
        user_service.add(new_user)
        assert False
    except ValueError:
        assert True

def test_delete(user_service: UserService):
    user_to_delete = user_service.get(user3.device_id)
    user_service.delete(user_to_delete.id)
    query_result = user_service.get(user_to_delete.device_id)
    assert query_result == None
