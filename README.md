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