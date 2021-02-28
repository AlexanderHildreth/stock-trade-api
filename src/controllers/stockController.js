// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const databaseUtil  = require('../utils/database');

module.exports = {
  // @desc    Get all trades by stock symbol
  // @root    GET /api/v1/trades
  // @route   GET /api/v1/trades/:symbol/trades
  // @access  Public
  filterStockBySymbol: (req, symbol) => {
    return new Promise((resolve, reject) => {
      const { type, start, end } = req.query;
      const DB = databaseUtil.createDbConn(req);
      
      const statement = DB.prepare(
        `SELECT * FROM trades WHERE symbol = ? AND type = ? AND timestamp BETWEEN date(?) AND date(?, '+1 day') ORDER BY id`
      ).bind([symbol, type, start, end])
      
      DB.get('SELECT id FROM trades WHERE symbol = ? LIMIT 1', symbol, (err, res) => {
          if (err || !res) {
            return reject(new ErrorResponse(`Stock not found with symbol: ${req.params.symbol}`, 404));
          }

          statement.all((err, res) => {
            if (err) return reject(err);
            
            resolve(res.map(databaseUtil.format));
          });
        }
      );
    });
  },
  // @desc    Get high/low prices for stock by symbol
  // @root    GET /api/v1/trades
  // @route   GET /api/v1/trades/:symbol/price
  // @access  Public
  filterStockByPrice: (req, symbol) => {
    return new Promise((resolve, reject) => {
      const { type, start, end } = req.query;
      const DB = databaseUtil.createDbConn(req);
      
      const statement = DB.prepare(
        `SELECT symbol, MIN(price), MAX(price), COUNT(id) FROM trades WHERE symbol=? AND timestamp BETWEEN date(?) AND date(?, '+1 day')`
      ).bind([symbol, type, start, end]);
      
      DB.get('SELECT id FROM trades WHERE symbol=? LIMIT 1', symbol, (err, res) => {
          if (err || !res) {
            return reject(new ErrorResponse(`Stock not found with symbol: ${req.params.symbol}`, 404));
          }
          
          statement.get((err, res) => {
            if (err) {
              return reject(new ErrorResponse(`There was an error: ${err}`, 404));
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
};