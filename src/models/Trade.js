// Modules
const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema({
  id: Number,
  type: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  symbol: String,
  shares: String,
  price: {
    type: Number, 
    set: function (v) { 
      return Math.round(v);
    }
  },
  timestamp: {
    type: Date
  }
});

module.exports = mongoose.model('Trade', TradeSchema);;