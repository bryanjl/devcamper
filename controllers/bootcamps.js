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

        if(!bootcamp){
            return res.status(400).json({ success: false, msg: 'Item not found' });
        }

        res
            .status(200)
            .json({
                success: true,
                data: bootcamp
            });
    } catch (error) {
        res
            .status(400)
            .json({
                success: false,
                msg: error.message
            });
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
        res.status(400).json({ success: false, msg: error.message });
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
            return res.status(400).json({ success: false, msg: 'Item not found' });
        }

        res
            .status(200)
            .json({ success: true, data: bootcamp });

    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }    
}

//@desc     Delete a bootcamp with id
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private - admin/publisher of bootcamp
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp) {
            return res.status(400).json({ success: false, msg: 'Item not found' });
        }

        res
            .status(200)
            .json({
                success: true,
                data: 'Item successfully deleted'
            });
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
    }
}