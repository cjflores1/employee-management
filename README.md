## INSTALL DEPENDENCIES
npm i

## SET .ENV FILE
Clone the **.env-template** file and rename it to **.env**. Set all environment variables
### Default values
The application listens on this port: `PORT=3000`

JWT uses "secret" key to sign tokens: `SECRET=secretKey01`

## DATABASE
This application uses JSON files to simulate a database. These JSON files are in the **"database"** folder.

## RUN
Develop mode `npm run dev`

Production mode `npm start`

## CREDENTIALS TO GET THE TOKEN
Use Postman as client rest.
Send these credentials: `{"name": "admin", "password": "admin"}` as **body request** to **localhost:3000/api/v1/users/login** endpoint with **POST** HTTP method selected.
### Set the authorization
Set the ***"Authorization"** property with the **Type** **"Bearer Token"** and finally set the token field with the token generated.
