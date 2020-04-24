# leaner-api
A NodeJS backend API that collects and returns a JSON object when called containing bootcamps and courses. It uses `node-geocoder` to display a map with available courses, or courses within a given radius.

## Endpoints
Current API version is `v1` and the base endpoint is: `/api/v1/`

### Bootcamps endpoints
Route | Request | Expected Response
------|:----:|------------------ 
bootcamps/ | GET | JSON obj with all bootcamps
bootcamps/ | POST | Creates a bootcamp with given JSON obj
bootcamps/:id | GET | JSON obj with a bootcamp
bootcamps/:id/courses | GET | JSON obj with all courses in bootcamp
bootcamps/:id | PUT | Updates bootcamp with given ID and JSON obj
bootcamps/:id | DELETE | Deletes bootcamp with given ID

### Courses endpoints
Route | Request | Expected Response
------|:----:|------------------ 
courses/ | GET | JSON obj with all courses
courses/ | POST | Creates a course with given JSON obj
courses/:id | GET | JSON obj with a course
courses/:bootcampId/courses | GET | JSON obj with all courses in bootcamp
courses/:id | PUT | Updates course with given ID and JSON obj
courses/:id | DELETE | Deletes course with given ID

## ENV Variables
Create a file in the `/config` directory and name it `config.env`
```
MONGODB_URI= // uri to DB host for connection

NODE_ENV=development // ENV, set to development by default
PORT= // Port for server to listen on, if not set defaults to 5000

GEOCODER_PROVIDER= //gecoder map provider
GEOCODER_API_KEY= //API key for map provider
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