// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const databaseUtil  = require('../utils/database');


// @desc    Get all trades by stock symbol
// @root    GET /api/v1/trades
// @route   GET /api/v1/trades/:symbol/trades
// @access  Public
exports.filterStockBySymbol = asyncHandler(async (req, res, next) => {
  const { symbol, type, start, end } = req.query;
  const DB = databaseUtil.getDbConn(req)
  const error = false
  
  const statement = await DB.prepare(
    `SELECT * FROM trades WHERE symbol = ? AND type = ? AND timestamp BETWEEN date(?) AND date(?, '+1 day') ORDER BY id`
  ).bind([symbol, type, start, end]);

  let result = await db.get(
    'SELECT id FROM trades WHERE symbol = ? LIMIT 1',
    symbol,
    (err, res) => {
      if (err || !res) {
        error = true
      };
      
      statement.all((err, res) => {
        if (err) {
          error = true
        };
        
        res.map(databaseUtil.format);
      });
    }
  );

  if(error || !result) return next(new ErrorResponse(`Stock not found with symbol: ${req.params.symbol}`, 404));
})


// @desc    Get high/low prices for stock by symbol
// @root    GET /api/v1/trades
// @route   GET /api/v1/trades/:symbol/price
// @access  Public
exports.filterStockByPrice = asyncHandler(async (req, res, next) => {
  const { symbol, type, start, end } = req.query;
  const DB = databaseUtil.getDbConn
  const error = false
  
  const statement = await DB.prepare(
    `SELECT symbol, MIN(price), MAX(price), COUNT(id) FROM trades WHERE symbol=? AND timestamp BETWEEN date(?) AND date(?, '+1 day')`
  ).bind([symbol, type, start, end]);

  let result = await db.get(
    'SELECT id FROM trades WHERE symbol=? LIMIT 1',
    symbol,
    (err, res) => {
      if (err) {
        error = true
      };

      if (!res) {
        return next(new ErrorResponse('There are no trades in the given date range', 404));
      }
      
      statement.all((err, res) => {
        if (err) {
          error = true
        };
        
        res.status(200)
          .json( {
            symbol: res.symbol,
            highest: res['MAX(price)'],
            lowest: res['MIN(price)']
        });
      });
    }
  );

  if(error || !result) return next(new ErrorResponse(`Stock not found with symbol: ${req.params.symbol}`, 404));
})