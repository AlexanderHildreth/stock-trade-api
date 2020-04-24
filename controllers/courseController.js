// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const Course        = require('../models/Course')

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamp/:bootcampId/courses
// @access  Public

exports.getCourses = asyncHandler(async(req, res, next) => {
    let query
    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        query = Course.find()
    }

    const getCourses = await query

    res.status(200)
        .json({
            success: true,
            count: getCourses.length,
            data: getCourses
        })
})