// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const Trade         = require('../models/Trade')


// @desc    Get all trades
// @root    GET /api/v1/trades
// @route   GET /api/v1/trades
// @access  Public
exports.getAllTrades = asyncHandler(async (req, res, next) => {
    const allTrades = await Trade.find().populate({
        path: 'user',
        select: 'name'
    })

    res.status(200).json({
        status: 'success',
        results: allTrades.length,
        data: {
          allTrades
        }
    });
}); 

// @desc    Create a trade
// @root    POST /api/v1/trades/
// @route   POST /api/v1/trades/
// @access  Public
exports.createTrade = asyncHandler(async(req, res, next) => {
    id = req.body.id
    const publishedTrade = await Trade.findOne({ id: id })
    
    if(publishedTrade) {
        return next(new ErrorResponse(`Duplicate ID: Trade with this id currently exists`, 400))
    }

    const createTrade = await Trade.create(req.body)

    res.status(201)
        .json({
            success: true,
            data: createTrade
        })
})

// @desc    Delete all trades
// @route   DELETE /api/v1/erase/
// @access  Public
exports.deleteAllTrades = asyncHandler(async(req, res, next) => {
    const deleteTrades = await Trade.deleteMany({})

    if (!deleteTrades) {
        return next(new ErrorResponse(`Trades collection purge unsuccessful`, 404));
    }

    res.status(200).json({
      success: true,
      data: {}
    });
})

// @desc    Get all trades by user ID
// @route   GET /api/v1/trades/user/:userId
// @access  Public
exports.getTradesByUserId = asyncHandler(async(req, res, next) => {
    const getUserTrades = await Trade.find({ user: req.params.userID})

    if(!getUserTrades) {
        return next(new ErrorResponse(`UNKNOWN ID: User with ID ${req.params.userID} not found`, 404))
    }

    res.status(200)
    .json({
        success: true,
        count: getUserTrades.length,
        data: getUserTrades
    })
})