// Files
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
                
                resolve(res.map(databaseUtil.format));
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

            req.body.forEach(element => {
                const statement = DB.prepare(
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
    getTradesByUserId: (req, userId) => {
        return new Promise((resolve, reject) => {
            const DB = databaseUtil.getDbConn(req);
            
            const statement = DB.prepare('SELECT * FROM trades WHERE user_id = ? ORDER BY id');
                
            result = DB.all(userId, (err, res) => {
                if (err) {
                    console.log(err)
                    return reject(new ErrorResponse(`There was a error - ${err}`, 400));
                }
                
                if (res.length === 0) {
                    return reject(new ErrorResponse('There was a error', 400));
                }
                
                statement.run(err => {
                    if (err) {
                        return reject(new ErrorResponse(`There was a error - ${err}`, 400));
                    }
                })
                
                resolve(res.map(databaseUtil.format));
            });
        });
    }
}
