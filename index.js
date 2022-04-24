const express = require('express');
const colors = require('colors'); // To make pretty colors in the console. Not needed to proper production
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const {errorHandler} = require('./backend/middleware/errorMiddleware');
const connectDB = require('./backend/config/db');
const app = express();
const url = '/api/v1/'; // All requests will need to start with this. (domain.com/[insert this const here])

//Middleware to read and parse json and form data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Different routes go here, then sends routes to the controllers for processing
app.use(url + 'invoice', require('./backend/routes/invoiceRoutes'));
app.use(url + 'techs', require('./backend/routes/techRoutes'));

// Uses the error handler for the "throw new Error messages"
app.use(errorHandler)

// Starts the server, then connects to the Mongo Database. 
app.listen(port, () => console.log(`Server started on port ${port}`.white));
connectDB()

