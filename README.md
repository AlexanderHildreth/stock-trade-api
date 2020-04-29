# leaner-api
A NodeJS backend API that collects and returns a JSON object when called containing bootcamps and courses. It uses `node-geocoder` to display a map with available courses, or courses within a given radius.

## ENV Variables
Create a file in the `/config` directory and name it `config.env`
```
# DB ENV VARS
MONGODB_URI= # URI to DB host for connection

# APP ENV VARS
API_V= # API version - Needed
FILE_UPLOAD_PATH=./public/uploads # Public path to upload files, can be changed
JWT_EXPIRE=1d # JWT expiration, can be changed
JWT_SECRET= # JWT secret - Needed
JWT_COOKIE_EXPIRE=1 # JWT cookie experation, can be changed
MAX_FILE_UPLOAD=1000000 # File upload size, can be changed
NODE_ENV=development # Node enviroment
PORT=9999 # Port, can be changed, defaults to 5000

# MAIL SERVER ENV VARS
FROM_EMAIL= # From email address - Needed
FROM_NAME= # From sender name - Needed
SMTP_HOST= # Mail host - Needed
SMTP_PORT= # Mail host port - Needed
SMTP_EMAIL= # SMTP email address - Needed
SMTP_PASSWORD= # SMTP email address password - Needed

# GEOCODER ENV VARS
GEOCODER_PROVIDER= # Gecoder map provider
GEOCODER_API_KEY= # AAPI key for map provider
```
A list of all supported `node-gecoder` providers can be found here [here](https://www.npmjs.com/package/node-geocoder#geocoder-providers-in-alphabetical-order)
## Setup
### Local Enviroment
*   ```
    npm install 
    ```
*   ```
    node seeder.js -i
    ```
    seeder usage: 
    * -i, --import - imports files in `_data/` into DB
    * -d, --delete - destroys data in DB
*   ```
    npm run dev
    ``` 

And you can start getting data from the server: [http://localhost:5000](http://localhost:5000). It's recommended to use Postman to test the API

`PORT=5000` being the default value 

## Endpoints
Current API version is `v1` and the base endpoint is: `/api/v1/`

### Bootcamps endpoints
Route | Request | Access | Expected Response
------|---------|--------|------------------- 
bootcamps/ | GET | Public | JSON obj with all bootcamps
bootcamps/ | POST | Private | Creates a bootcamp with given JSON obj
bootcamps/radius/:zipcode/:distance | GET | Public | JSON obj with bootcamp(s) within given distance of zipcode
bootcamps/:id | GET | Public | JSON obj with a bootcamp
<!-- bootcamps/:id/courses | GET | Public | JSON obj with all courses in bootcamp -->
bootcamps/:id | PUT | Private | Updates bootcamp with given ID and JSON obj
bootcamps/:id | DELETE | Private | Deletes bootcamp with given ID
bootcamps/:id/photo | PUT | Private | Uploads a photo for specific bootcamp

### Courses endpoints
Route | Request | Access | Expected Response
------|---------|--------|------------------- 
<!-- courses/ | GET | Public | JSON obj with all courses -->
bootcamp/:bootcampId/courses | GET | Public | JSON obj with all courses in bootcamp
bootcamp/:bootcampId/courses | POST | Private | Creates a course with given JSON obj
courses/:id | GET | Public | JSON obj with a course
courses/:id | PUT | Private | Updates course with given ID and JSON obj
courses/:id | DELETE | Private | Deletes course with given ID

### User endpoints
Route | Request | Access | Expected Response
------|---------|--------|------------------- 
users/ | GET | Private | JSON obj with all users
users/:id | GET | Private | JSON obj with a user
users/:id | PUT | Private | Updates user with given ID and JSON obj
users/:id | DELETE | Private | Deletes user with given ID

### Auth endpoints
Route | Request | Access | Expected Response
------|---------|--------|------------------- 
auth/currentUser | GET | Private | JSON obj with current logged in user
auth/register | POST | Public | Register a user with given JSON obj
auth/login | POST | Public | Login a user with given JSON obj
auth/updatepassword | PUT | Private | JSON obj to update password of current user
auth/resetpassword/:resetToken | PUT | Public | Reset password callback link
auth/forgotpassword | POST | PUBLIC | Forgot password link to reset password

### Search params
param | result | Eg.
------|--------|----
select | Returns JSON obj with selected fields | `?select=name,description`
sort | Returns JSON obj with sorted data | `?sort=-name` (desc, for asc replace `-` with `+`)
limit | Returns limited results in JSON obj | `?limit=5`
page | returns page | `?page=2`