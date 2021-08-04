const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');


//@desc     Get all courses
//@route    GET /api/v1/courses
//@route    GET /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    //check to see if bootcamp id exists
    let query;

    if(req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
});

//@desc     Get a single course
//@route    GET /api/v1/courses
//@access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    });

    if(!course){
        return next(
            new ErrorResponse(`No course with ID of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: course
    });
});

//@desc     Create a course
//@route    POST /api/v1/bootcamps/:bootcampId/courses
//@access   Private - admin/publisher
exports.createCourse = asyncHandler(async (req, res, next) => {
    //add the bootcamp id to req.body
    req.body.bootcamp = req.params.bootcampId

    //find and check if bootcamp exists
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if(!bootcamp){
        next(
            new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404)
        );
    }
    
    //create the course
    const course = await Course.create(req.body);    

    res.status(200).json({
        success: true,
        data: course
    });
});