const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');


//@desc     Register a user
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    //create User
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    //send token
    sendTokenResponse(user, 200, res);
 });

//@desc     Login a user
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //validate the email and password
    if(!email || !password){
        return next(new ErrorResponse(`Please provide an email and password`, 400))
    }

    //check for user
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    //check password
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
        return next(new ErrorResponse('invalid Credentials'));
    }

    //send token
    sendTokenResponse(user, 200, res);
 });

 //get token from model, create cookie and send response
 const sendTokenResponse = (user, statusCode, res) => {
     //create token
     const token = user.getSignedJwtToken();

     const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), //30days,
        httpOnly: true
     };

     //if in production mode make secure
     if(process.env.NODE_ENV === 'production') {
         options.secure = true;
     }

     res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
 }

    //@desc     Get current logged in user
    //@route    GET /api/v1/auth/me
    //@access   Private
    exports.getMe = asyncHandler(async (req, res, next) => {
        const user = await User.findById(req.user.id);

        res
            .status(200)
            .json({
                success: true,
                data: user
            });
    });  
