// Modules
const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema({
  type: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  symbol: {
    type: String
  },
  shares: {
    type: String
  },
  price: {
  },
  timestamp: {
    type: Date
  }
});

const Trade = mongoose.model('Trade', TradeSchema);
module.exports = Trade;