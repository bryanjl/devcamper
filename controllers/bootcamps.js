//@desc     Get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: 'Get all bootcamps' });
}

//@desc     Get a bootcamp with id
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = (req, res, next) => {
    res 
        .status(200)
        .json({ success: true, msg: `Get bootcamp with id ${req.params.id}` });
}

//@desc     Create a bootcamp
//@route    POST /api/v1/bootcamps
//@access   Private - admin/publisher
exports.createBootcamp = (req, res, next) => {
    res 
        .status(201)
        .json({ success: true, msg: 'create new bootcamp' });
}

//@desc     Update a bootcamp with id
//@route    PUT /api/v1/bootcamps/:id
//@access   Private - admin/publisher of bootcamp
exports.updateBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Update bootcamp with id ${req.params.id}` });    
}

//@desc     Delete a bootcamp with id
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private - admin/publisher of bootcamp
exports.deleteBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete the bootcamp with id ${req.params.id}`  });  
}