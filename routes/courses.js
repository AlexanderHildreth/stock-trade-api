// Modules
const express           = require('express')
// files
const Course            = require('../models/Course')
const courseController  = require('../controllers/courseController')
const customResults     = require('../middlewares/customResults')
// const vars
const router            = express.Router({ mergeParams: true })

router.route('/')
    .get(
        customResults(Course, { path: 'bootcamp', select: 'name description' }),
        courseController.getCourses
        )
    .post(courseController.createCourse)

router.route('/:id')
    .get(courseController.getCourseById)
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse)

module.exports = router
