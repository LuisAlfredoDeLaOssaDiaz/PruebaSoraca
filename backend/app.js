const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {API_VERSION} = require('./constants');

const app = express();

// Import routings
const routers = require('./router');

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static('uploads'));

// Configure Headers HTTP & CORS
app.use(cors());

// Configure routings
app.use(`/api/${API_VERSION}`, routers.noteRoutes); 
app.use(`/api/${API_VERSION}`, routers.userRoutes); 
app.use(`/api/${API_VERSION}`, routers.authRoutes); 

module.exports = app;