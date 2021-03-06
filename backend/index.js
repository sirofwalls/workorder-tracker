const express = require('express');
const path = require('path')
const colors = require('colors'); // To make pretty colors in the console. Not needed to proper production
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware');
const maria = require('./config/db')
const app = express();
const url = '/api/v1/'; // All requests will need to start with this. (domain.com/[insert this const here])

//Middleware to read and parse json and form data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Different routes go here, then sends routes to the controllers for processing
app.use(url + 'workorder', require('./routes/workorderRoutes'));
app.use(url + 'techs', require('./routes/techRoutes'));
app.use(url + 'client', require('./routes/clientRoutes'));

// Location of frontend after build (For production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else{
    app.get('/', (req, res) => res.send('Set  mode to production'))
}

// Uses the error handler for the "throw new Error messages"
app.use(errorHandler)

// Starts the server, then connects to the SQL Database. 
app.listen(port, () => console.log(`Server started on port ${port}`.white));

connectDB = () => {
    try {
        const conn = maria
        console.log(`MariaDB connected:  ${conn.config.host}`.white);
    } catch (err) {
        console.log(`${err}`.red)
        process.exit(1)
    }
}
connectDB()