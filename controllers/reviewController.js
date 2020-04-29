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