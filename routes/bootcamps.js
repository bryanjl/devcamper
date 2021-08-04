const express = require('express');
//Bring in Conroller methods using destructuring
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require('../controllers/bootcamps');

//resource router for Courses
const courseRouter = require('./courses');

//set up router from express
const router = express.Router();

router.use('/:bootcampId/courses', courseRouter);

//set up routes for bootcamps
//routes for bootcamps
//     /api/v1/bootcamps

router
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router  
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

//export the router to be used in app
module.exports = router;