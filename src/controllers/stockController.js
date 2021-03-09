// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const Trade         = require('../models/Trade')

// @desc    Get all highest and lowest in date range by stock symbol
// @root    GET /api/v1/stocks
// @route   GET /api/v1/stocks/:symbol/price
// @access  Public
exports.getStockFluxPriceByDate = asyncHandler(async (req, res, next) => {
  start = new Date(req.query.start);
  end   = new Date(req.query.end);
 
  const stockPriceMin = await Trade.find({
    symbol: req.params.symbol,
    timestamp: {
      $gte: start,
      $lte: end
    }
  }).sort({price: +1}).limit(1)

  const stockPriceMax = await Trade.find({
    symbol: req.params.symbol,
    timestamp: {
      $gte: start,
      $lte: end
    }
  }).sort({price: -1}).limit(1)

  const stockPriceFlux = {
    symbol: req.params.symbol,
    minPrice: stockPriceMin,
    maxPrice: stockPriceMax
  }
  res.status(201)
    .json({
      success: true,
      results: stockPriceFlux.length,
      data: {
        stockPriceFlux
      }
    })
})
  // @desc    Get high/low prices for stock by symbol
  // @root    GET /api/v1/trades
  // @route   GET /api/v1/trades/:symbol/price
  // @access  Public
  /*getStockStats: req => {
    return new Promise((resolve, reject) => {
      const { type, start, end } = req.query;
      const DB = databaseUtil.getDbConn(req);

      const statement = DB.prepare(
        `SELECT symbol, MIN(price), MAX(price), COUNT(id) FROM trades WHERE symbol = ? AND timestamp BETWEEN date(?) AND date(?, '+1 day')`
      ).bind([symbol, type, start, end]);

      DB.get('SELECT id FROM trades WHERE symbol=? LIMIT 1', symbol, (err, res) => {
          if (err) {
            console.log(err)
            return reject(new ErrorResponse(`Stock not found with symbol: ${symbol}`, 404));
          }
          
          statement.get((err, res) => {
            if (err) {
              return reject(new ErrorResponse(`There was an error: ${err}`, 404));
            }

            if (!res) {
              return resolve({
                message: 'There are no trades in the given date range'
              });
            }
            
            resolve({
              symbol: res.symbol,
              highest: res['MAX(price)'],
              lowest: res['MIN(price)']
            })
          });
        }
      );
    });
  }
};*/