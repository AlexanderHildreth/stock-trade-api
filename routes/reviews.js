// Modules
const express           = require('express')
// files
const auth              = require('../middlewares/auth')
const Review            = require('../models/Review')
const reviewController  = require('../controllers/reviewController')
const customResults     = require('../middlewares/customResults')
// const vars
const router            = express.Router({ mergeParams: true })

router.route('/')
    .get(
        customResults(Review, { 
            path: 'bootcamp', 
            select: 'name description'
        }),
        reviewController.getReviews
    )
    .post(
        auth.protect,
        auth.authorise('admin', 'user'),
        reviewController.createReview
    )

router.route('/:id')
    .get(reviewController.getReviewById)
    .put(
        auth.protect,
        auth.authorise('user', 'admin'),
        reviewController.updateReview
    )
    .delete(
        auth.protect,
        auth.authorise('user', 'admin'),
        reviewController.deleteReview
    )

module.exports = router