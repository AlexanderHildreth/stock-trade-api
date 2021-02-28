// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const databaseUtil  = require('../utils/database');

module.exports = {
    // @desc    Get all trades
    // @root    GET /api/v1/trades
    // @route   GET /api/v1/trades
    // @access  Public
    getAllTrades: req => {
        return new Promise((resolve, reject) => {
            const DB = databaseUtil.getDbConn(req);
            
            result = DB.all('SELECT * FROM trades ORDER BY id', (err, res) => {
                if (err) {
                    return reject(err);
                };
                
                resolve(res.map(databaseUtil.format(res)));
            });
            
        })
    },
    // @desc    Create a trade
    // @root    POST /api/v1/trades/
    // @route   POST /api/v1/trades/
    // @access  Public
    createTrade: req => {
        return new Promise((resolve, reject) => {
            const DB = databaseUtil.getDbConn(req);
            
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
                if (err) {
                    return reject(err);
                };

                if (res.length > 0) {
                    return reject()
                }

                statement.run(err => {
                    if (err) reject(err);
                });
            });
            
            res.status(201)
            .json({
                success: true,
                data: result
            })

            resolve()
        })
    }    
}
/*
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
    const DB = databaseUtil.getDbConn(req);

    const statement = DB.prepare(
    `SELECT * FROM trades WHERE user_id = ? ORDER BY id`
    );
    statement.all(userID, (err, res) => {
    if (err || res.length === 0) {
        return next(new ErrorResponse(`There was a error - ${err.message}`, 400));
    };

    res.map(databaseUtil.format);
    });
});*/
