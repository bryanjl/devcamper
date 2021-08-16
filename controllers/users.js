const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');

//@desc     Get all users
//@route    GET /api/v1/users
//@access   Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
 });

//@desc     Get a single user
//@route    GET /api/v1/users/:id
//@access   Private?admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorResponse(`No user with ID of ${req.params.id}`, 404));
    }

    res
        .status(200)
        .json({
            success: true,
            data: user
        });
 });

//@desc     Create a user
//@route    POST /api/v1/users
//@access   Private?admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
 });

//@desc     Update a user
//@route    PUT /api/v1/users/:id
//@access   Private?admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!user){
        return next(new ErrorResponse(`No user with ID of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: user
    });
 });

//@desc     Delete a user
//@route    DELETE /api/v1/users/:id
//@access   Private?admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
 });