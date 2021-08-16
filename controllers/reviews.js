const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');

//@desc     Get reviews
//@route    GET /api/v1/reviews
//@route    GET /api/v1/bootcamps/:bootcampId/reviews
//@access   Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if(req.params.bootcampId) {
        const reviews = await Review.find( { bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });

    } else {
        res.status(200).json(res.advancedResults);
    }
});

//@desc     Get a single review
//@route    GET /api/v1/reviews/:id
//@access   Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if(!review){
        return next(new ErrorResponse(`Review with ID of ${req.params.id} not found`, 404));
    }

    res
        .status(200)    
        .json({
            success: true,
            data: review
        });
});

//@desc     Create a review 
//@route    GET /api/v1/bootcamps/:bootcampId/reviews
//@access   Public
exports.createReview = asyncHandler(async (req, res, next) => {
    
    //check if bootcamp exists
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if(!bootcamp){
        return next(new ErrorResponse(`No bootcamp with ID of ${req.params.bootcampId} found`, 404));
    }
    
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const review = await Review.create(req.body);

    res
        .status(201)
        .json({
            success: true,
            data: review
        });
});

//@desc     Update a review 
//@route    PUT /api/v1/reviews/:id
//@access   Private - user/author/admin
exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if(!review){
        return next(new ErrorResponse(`No reivew with ID of ${req.params.id}`, 404));
    }

    //make sure the user is the owner of the review
    if(review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User with Id of ${req.user.id} is not authorized to update this review`, 401));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res
        .status(201)
        .json({
            success: true,
            data: review
        });
});

//@desc     Delete a review 
//@route    DELETE /api/v1/reviews/:id
//@access   Private - user/author/admin
exports.deleteReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if(!review){
        return next(new ErrorResponse(`No reivew with ID of ${req.params.id}`, 404));
    }

    //make sure the user is the owner of the review
    if(review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User with Id of ${req.user.id} is not authorized to delete this review`, 401));
    }

    await Review.findByIdAndDelete(req.params.id);

    res
        .status(200)
        .json({
            success: true,
            data: {}
        });
});
