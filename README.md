# leaner-api
A NodeJS backend API that collects and returns a JSON object when called containing bootcamps and courses. It uses `node-geocoder` to display a map with available courses, or courses within a given radius.

## ENV Variables
Rename `config.env.env` file found in the `/config` directory to `config.env`.

Below are he necessary vars
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
### Development Enviroment
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

### Production Enviroment
*   ```
    npm install 
    ```
*   ```
    npm start
    ``` 


## Endpoints
Endpoint documentation will be found at the index of [http://localhost:5000](http://localhost:5000) or whatever your host is of your dev enviroment

Current API version is `v1`, and can be changed in the `config.env` iff need be. There are some code snippets that use the env var of the API version, so make sure it's up to dat 

The base endpoint is: `/api/v1/`

So exampl URL would be: `<protocol>://<host>/api/v1/<endpoint>`

### Search params
param | result | Eg.
------|--------|----
select | Returns JSON obj with selected fields | `?select=name,description`
sort | Returns JSON obj with sorted data | `?sort=-name` (desc, for asc replace `-` with `+`)
limit | Returns limited results in JSON obj | `?limit=5`
page | returns page | `?page=2`

### Version 1.0.0
### License: MIT