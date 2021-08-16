const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //bring in middleware
const expressSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//bring route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

//connect to DB
connectDB();



const app = express();

//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//middleware dev logger
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//file uploading
app.use(fileupload());

//sanitize for SQL injections
app.use(expressSanitize());

//set security headers
app.use(helmet());

//prevent xss attacks
app.use(xss());

//rate limiting
const limiter = rateLimit({
    windowOf: 10 * 60 * 1000, //10 minutes
    max: 100
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//enable cors
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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