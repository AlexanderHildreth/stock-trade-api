// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const Bootcamp      = require('../models/Bootcamp')
const Review        = require('../models/Review')

// @desc    Get all reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/bootcamp/:bootcampId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const getReviewsByBootcampId = await Review.find({ bootcamp: req.params.bootcampId })

        return res.status(200).json({
            success: true,
            count: getReviewsByBootcampId.length,
            data: getReviewsByBootcampId
        })
    } else {
        res.status(200).json(res.customResults)
    }
})

// @desc    Get a review
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReviewById = asyncHandler(async (req, res, next) => {
    const getReview = await Review.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if (!getReview) return next(new ErrorResponse(`Review not found with id: ${req.params.id}`, 404));

    res.status(200)
        .json({
            success: true,
            data: getReview
        })
})

// @desc    Create a review
// @route   POST /api/v1/bootcamps/:bootcampId/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp   = req.params.bootcampId
    req.body.user       = req.user.id
    const bootcamp      = await Bootcamp.findById(req.params.bootcampId)

    if (!bootcamp) return next(new ErrorResponse(`Bootcamp not found with id: ${req.params.bootcampId}`, 404));

    if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User not authorised to add review to this bootcamp`, 401));
    }

    const createReview = await Review.create(req.body)
    if (!createReview) {
        return next(new ErrorResponse(`Review not created`, 404));
    }


    res.status(201)
        .json({
            success: true,
            data: createReview
        })
})

// @desc    Update a reviews
// @route   Put /api/v1/reviewss/:id
// @access  Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    let updateReview = await Review.findById(req.params.id)

    if (!updateReview) return next(new ErrorResponse(`Review not found with id: ${req.params.id}`, 404));

    if (updateReview.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User not authorised to update this review`, 401));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200)
        .json({
            success: true,
            data: updateReview
        })
})

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const deleteCourse = await Course.findById(req.params.id)

    if (!deleteCourse) return next(new ErrorResponse(`Course not found with id: ${req.params.id}`, 404));

    if (deleteCourse.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User not authorised to delete this course`, 401));
    }

    await deleteCourse.remove()

    res.status(200)
        .json({
            success: true,
            data: {}
        })
})