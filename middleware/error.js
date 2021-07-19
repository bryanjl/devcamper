const ErrorResponse = require('../utils/ErrorResponse');


//custom error handler

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    //console print for dev
    // let arr = err.errors;
    // console.log(Array.isArray(arr));
    
    //Mongoose Can't find item with ID
    if(err.name === 'CastError') {
        let message = `Bootcamp with ID of ${err.value} not found`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate value in field
    if(err.code === 11000){
        let message = `Cannot use duplicate values in field`;
        error = new ErrorResponse(message, 400);
    }

    //mongoose validation errors
    //name, address, description
    if(err.name === 'ValidationError'){
        let message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }


    res 
        .status(error.statusCode || 500)
        .json({
            success: false,
            msg: error.message || 'Server Error'
        });
}

module.exports = errorHandler;