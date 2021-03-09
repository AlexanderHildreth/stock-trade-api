// Modules
const colours         = require('colors')
const express         = require('express')
// files
const tradeController = require('../controllers/tradeController')
const Trade           = require('../models/Trade')
const User           = require('../models/User')
const customResults   = require('../middlewares/customResults')
// const vars
const router          = express.Router()

router.route('/')
  .get(
    tradeController.getAllTrades)
  .post(tradeController.createTrade);

router.route('/users/:userID')
    .get(tradeController.getTradesByUserId)

module.exports = router;