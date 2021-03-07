// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const databaseUtil  = require('../utils/database');
const Trade         = require('../models/Trade')


// @desc    Get all trades
// @root    GET /api/v1/trades
// @route   GET /api/v1/trades
// @access  Public
exports.getAllTrades = asyncHandler(async (req, res, next) => {
    const allTrades = await Trade.find()

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
// exports.createTrade = asyncHandler(async(req, res, next) => {
//     req.body.user        = req.user.id
//     const publishedTrade = await Trade.findOne({ id: req.user.id })
    
//     if(publishedTrade) {
//         return next(new ErrorResponse(`Duplicate ID: Trade with this id currently exists`, 400))
//     }

//     const createTrade = await Trade.create(req.body)

//     res.status(201)
//         .json({
//             success: true,
//             data: createTrade
//         })
// })
    
    /*createTrade: req => {
        return new Promise((resolve, reject) => {
            const DB = databaseUtil.getDbConn(req);

            req.body.forEach(element => {
                var statement = DB.prepare(
                    'INSERT INTO trades (id, type, user_id, user_name, symbol, shares, price, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'         
                ).bind([
                    element.id,
                    element.type,
                    element.user.id,
                    element.user.name,
                    element.symbol,
                    element.shares,
                    element.price,
                    element.timestamp
                ]);
                
                result = DB.all('SELECT id FROM trades WHERE id = ? LIMIT 1', (err, res) => {
                    if (err) {
                        return reject(new ErrorResponse(`There was a error - ${err.message}`, 400));
                    };
                    
                    if (res.length > 0) {
                        return reject()
                    }
                    
                    statement.run(err => {
                        if (err) reject(new ErrorResponse(`There was a error - ${err.message}`, 400));
                        
                    });
                });
            });

            resolve()
        })
    },   
    // @desc    Delete all trades
    // @route   DELETE /api/v1/trades/:id
    // @access  Public
    deleteAllTrades: req => {
        return new Promise((resolve, reject) => {
            const DB = databaseUtil.getDbConn(req);

            DB.run('DELETE FROM trades; VACUUM;', err => {
                if (err) {
                    return reject(new ErrorResponse(`There was a error - ${err.message}`, 400));
                };

                resolve()
            });
        })
    },
    // @desc    Get all trades by user ID
    // @route   GET /api/v1/trades/user/:userId
    // @access  Public
    getTradesByUserId: req => {
        return new Promise((resolve, reject) => {
            const DB = databaseUtil.getDbConn(req);
            
            const statement = DB.prepare('SELECT * FROM trades WHERE user_id = ? ORDER BY id');
            console.log(req.params.userId)
            /* DB.all(req.params.userId, (err, res) => {
                if (err) {
                    console.log(err)
                    return reject(new ErrorResponse(`There was a error - ${err}`, 400));
                }
                
                if (res.length === 0) {
                    console.log(res) 
                    return reject(new ErrorResponse('There was a error', 400));
                }
                
                statement.run(err => {
                    if (err) {
                        console.log(err)
                        return reject(new ErrorResponse(`There was a error - ${err}`, 400));
                    }
                })
                
                resolve(res.map(databaseUtil.format));
            });
        });
    }
}*/
