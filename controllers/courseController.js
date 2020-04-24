// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const Bootcamp      = require('../models/Bootcamp')
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
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        })
    }

    const getCourses = await query

    res.status(200)
        .json({
            success: true,
            count: getCourses.length,
            data: getCourses
        })
})

// @desc    Get a course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourseById = asyncHandler(async (req, res, next) => {
    const getCourse = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if (!getCourse) return next(new ErrorResponse(`Course not found with id: ${req.params.id}`, 404));

    res.status(200)
        .json({
            success: true,
            data: getCourse
        })
})

// @desc    Create a course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp   = req.params.bootcampId
    const bootcamp      = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.bootcampId}`, 404));

    const createCourse = Course.create(req.body)
    if (!createCourse) return next(new ErrorResponse(`Course not created`, 404));

    res.status(200)
        .json({
            success: true,
            data: createCourse
        })
})

// @desc    Update a course
// @route   Put /api/v1/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let updateCourse = await Course.findById(req.params.id)

    if (!updateCourse) return next(new ErrorResponse(`Course not found with id: ${req.params.id}`, 404));

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200)
        .json({
            success: true,
            data: updateCourse
        })
})

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const deleteCourse = await Course.findById(req.params.id)

    if (!deleteCourse) return next(new ErrorResponse(`Course not found with id: ${req.params.id}`, 404));

    await deleteCourse.remove()

    res.status(200)
        .json({
            success: true,
            data: {}
        })
})