const express = require('express');
const dotenv = require('dotenv');

//bring route files
const bootcamps = require('./routes/bootcamps');

//bring in middleware
const morgan = require('morgan');

//load env varssa
dotenv.config({ path: './config/config.env' });

const app = express();

//middleware dev logger
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//mount routers
app.use('/api/v1/bootcamps', bootcamps)

//finds the port from dotenv OR uses port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`));