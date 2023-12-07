# comp-523-dreamscape
## Back-end
### Set-up
In your terminal
* Make sure you have the latest Python installed
* Install the required modules: `pip3 install -r backend/requirements.txt`
* Reset the database: `python3 -m backend.script.reset_database`
* Run backend: `uvicorn backend.main:app --reload`

## Front-end
### To run React.js Admin app
In your terminal
* `cd dreamscape-admin`
* `npm install`
* `npm start`

### To run React Native Caregiver app
In your terminal
* `cd dreamscape-caregiver`
* `npm install`
* `npm run ios` or `npm run android`, depending on whether you have Xcode or Android Studio.
