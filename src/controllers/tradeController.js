// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const databaseUtil  = require('../utils/database');

// @desc    Get all trades
// @root    GET /api/v1/trades
// @route   GET /api/v1/trades
// @access  Public
exports.getAllTrades = asyncHandler(async(req, res, next) => {
    const DB = databaseUtil.getDbConn(req);
    const error = false

    result = DB.all('SELECT * FROM trades ORDER BY id', (err, res) => {
        if (err) {
            error = true
        };

        res.map(databaseUtil.format);
    });

    if(error || !result) return next(new ErrorResponse(`Stock not found with symbol: ${req.params.symbol}`, 404));
})

// @desc    Create a trade
// @root    POST /api/v1/trades/
// @route   POST /api/v1/trades/
// @access  Public
module.exports = {
    createTrade: req => {
        const DB = databaseUtil.getDbConn.getDB(req);
        const error = false
        
        const statement = DB.prepare(
        'INSERT INTO trades (id, type, user_id, user_name, symbol, shares, price, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
            req.body.id,
            req.body.type,
            req.body.user.id,
            req.body.user.name,
            req.body.symbol,
            req.body.shares,
            req.body.price,
            req.body.timestamp
        ]
        );

        result = DB.all('SELECT id FROM trades WHERE id = ? LIMIT 1', (err, res) => {
            if (err || res.length > 0) {
                return next(new ErrorResponse(`There was a error - ${err.message}`, 400));
            };
            statement.run(err => {
                if (err) next(new ErrorResponse(`There was a error - ${err.message}`, 400));
            });
        });
        
        res.status(201)
            .json({
                success: true,
                data: result
            })
    
    }
}

// @desc    Delete all trades
// @route   DELETE /api/v1/trades/:id
// @access  Public
exports.deleteAllTrades = asyncHandler(async (req, res, next) => {
    const DB = databaseUtil.getDbConn(req);

    DB.run('DELETE FROM trades; VACUUM;', err => {
        if (err) {
            return next(new ErrorResponse(`There was a error - ${err.message}`, 400));
        };
    });

    res.status(200)
        .json({
            success: true,
            data: {}
        })
})

// @desc    Get all trades by user ID
// @route   GET /api/v1/trades//user/userIid
// @access  Public
exports.getTradesByUserId = asyncHandler(async (req, res, next) => {
    const DB = databaseUtil.getDbConn.getDB(req);

    const statement = DB.prepare(
    `SELECT * FROM trades WHERE user_id = ? ORDER BY id`
    );
    statement.all(userID, (err, res) => {
    if (err || res.length === 0) {
        return next(new ErrorResponse(`There was a error - ${err.message}`, 400));
    };

    res.map(databaseUtil.format);
    });
});
