// Files
const ErrorResponse = require('../utils/errorResponse')

module.exports = {
  // @desc    Get all trades by stock symbol
  // @root    GET /api/v1/trades
  // @route   GET /api/v1/trades/:symbol/trades
  // @access  Public
  filterStockBySymbol: req => {
    return new Promise((resolve, reject) => {
      const { type, start, end } = req.query;
      const DB = databaseUtil.getDbConn(req);

      const statement = DB.prepare(
        `SELECT * FROM trades WHERE symbol = ? AND type = ? AND timestamp BETWEEN date(?) AND date(?, '+1 day') ORDER BY id`
      ).bind([req.params.symbol, type, start, end])
      
      DB.get('SELECT id FROM trades WHERE symbol = ?', req.params.symbol, (err, res) => {
          if (err || !res) {
            console.log(err)
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
  getStockStats: req => {
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
};