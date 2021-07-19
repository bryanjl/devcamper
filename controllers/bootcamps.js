const ErrorResponse = require('../utils/ErrorResponse');
const Bootcamp = require('../models/Bootcamp');


//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = async (req, res, next) => {
    
    try {
        const bootcamps = await Bootcamp.find();

        res
            .status(200)
            .json({ success: true, count: bootcamps.length, data: bootcamps });
    } catch (error) {
        res
            .status(400)
            .json({ success: false, msg: error.message });
    }    
}

//@desc     Get a bootcamp with id
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = async (req, res, next) => {
    
    try {
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
    } catch (error) {
        //using custom error handling - express docs -> use next to send error
        //When the id is not properly formatted 
        next(error);
    }
}

//@desc     Create a bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private - admin/publisher
exports.createBootcamp = async (req, res, next) => {
        
    try {
        const bootcamp = await Bootcamp.create(req.body);   
    
        res 
            .status(201)
            .json({ success: true, data: bootcamp });
    } catch (error) {
        next(error);
    }

}

//@desc     Update a bootcamp with id
//@route    PUT /api/v1/bootcamps/:id
//@access   Private - admin/publisher of bootcamp
exports.updateBootcamp = async (req, res, next) => {
    try {
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

    } catch (error) {
        next(error);
    }    
}

//@desc     Delete a bootcamp with id
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private - admin/publisher of bootcamp
exports.deleteBootcamp = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
}