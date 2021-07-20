const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');


//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    
        const bootcamps = await Bootcamp.find();

        res
            .status(200)
            .json({ success: true, count: bootcamps.length, data: bootcamps });  
});

//@desc     Get a bootcamp with id
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    
        const bootcamp = await Bootcamp.findById(req.params.id);

        //check to see if item exists -- using properly formatted id
        //if not send 400 back 
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp with ID of ${req.params.id} not found`, 404));
        }
        //send data back as JSON
        res
            .status(200)
            .json({
                success: true,
                data: bootcamp
            });
});

//@desc     Create a bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private - admin/publisher
exports.createBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.create(req.body);   
    
        res 
            .status(201)
            .json({ success: true, data: bootcamp });
});

//@desc     Update a bootcamp with id
//@route    PUT /api/v1/bootcamps/:id
//@access   Private - admin/publisher of bootcamp
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp with ID of ${req.params.id} not found`, 404));
        }

        res
            .status(200)
            .json({ success: true, data: bootcamp });
});

//@desc     Delete a bootcamp with id
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private - admin/publisher of bootcamp
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp with ID of ${req.params.id} not found`, 404));
        }

        res
            .status(200)
            .json({
                success: true,
                data: 'Item successfully deleted'
            });
});