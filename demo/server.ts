import * as config from './config';
import express from 'express';
import BaseApp from '../backend/app';
import startMeanCrudServer from '../backend/server';

// Create your own app express
let app = express();

// or use our Base App
app = BaseApp;

// Provide your app and the directory with the Open API Schemas and JSONSchemas
startMeanCrudServer(app, __dirname)
.then(()=>{
    app.listen(config.PORT, () => { // const server = 
        console.log(`Listen to port ${config.PORT}`);
    });
});
