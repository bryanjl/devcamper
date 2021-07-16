//@desc     simple and custom logging - using morgan dev logger instead

const logger = (req, res, next) => {
    console.log('Middleware is running');
    next();
}

module.exports = logger;