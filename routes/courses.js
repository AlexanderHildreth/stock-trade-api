// Modules
const express           = require('express')
// files
const courseController = require('../controllers/courseController')
// const vars
const router            = express.Router({ mergeParams: true })

router.route('/')
    .get(courseController.getCourses)
    .post(courseController.createCourse)

router.route('/:id')
    .get(courseController.getCourseById)
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse)

module.exports = router
