const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //bring in middleware
const errorHandler = require('./middleware/error');
const colors = require('colors');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//bring route files
const bootcamps = require('./routes/bootcamps');

//connect to DB
connectDB();



const app = express();

//body parser
app.use(express.json());

//middleware dev logger
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//mount routers
app.use('/api/v1/bootcamps', bootcamps)

//Mount Error handler
app.use(errorHandler);

//finds the port from dotenv OR uses port 5000
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.blue.bold));

//unhandled promise rejections handler
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}`.red.bold);
    //close the server
    server.close(() => process.exit(1));
});