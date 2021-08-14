const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');


//@desc     Get all courses
//@route    GET /api/v1/courses
//@route    GET /api/v1/bootcamps/:bootcampId/courses
//@access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {


    if(req.params.bootcampId) {
        const courses = await Course.find( { bootcamp:req.params.id });

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });

    } else {
        res.status(200).json(res.advancedResults);
    }
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

    //add user to course 
    req.body.user = req.user.id;

    //find and check if bootcamp exists
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if(!bootcamp){
        next(
            new ErrorResponse(`No bootcamp with id of ${req.params.bootcampId}`, 404)
        );
    }

    //make sure the user is the owner of the bootcamp
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`${req.user.id} is not authorized to create a course for this bootcamp`, 401));
    }
    
    //create the course
    const course = await Course.create(req.body);    

    res.status(200).json({
        success: true,
        data: course
    });
});

//@desc     Update a course
//@route    PUT /api/v1/courses/:id
//@access   Private - admin/publisher
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if(!course){
        return next(
            new ErrorResponse(`Course with id of ${req.params.id} not found`, 404)
        );
    }

    //make sure the user is the owner of the course
    if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`${req.user.id} is not authorized to update this course`, 401));
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: course
    });
});


//@desc     Delete a course
//@route    DELETE /api/v1/courses/:id
//@access   Private - admin/publisher
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if(!course) {
        return next(
            new ErrorResponse(`Course with id of ${req.params.id} cannot be found`, 404)
        );
    }

    //make sure the user is the owner of the course
    if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`${req.user.id} is not authorized to delete this course`, 401));
    }

    await course.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});