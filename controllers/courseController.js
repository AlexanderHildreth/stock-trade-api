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
    if (req.params.bootcampId) {
        const getCoursesByBootcampId = await Course.find({ bootcamp: req.params.bootcampId })

        return res.status(200).json({
            success: true,
            count: getCoursesByBootcampId.length,
            data: getCoursesByBootcampId
        })
    } else {
        res.status(200).json(res.customResults)
    }
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
    req.body.user       = req.user.id
    const bootcamp      = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.bootcampId}`, 404));

    const createCourse = await Course.create(req.body)
    if (!createCourse) {
        return next(new ErrorResponse(`Course not created`, 404));
    } 
    
    if (createCourse.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(new ErrorResponse(`User not authorised to add course to this bootcamp`, 404));
    }

    res.status(201)
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