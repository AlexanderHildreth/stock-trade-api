// Modules
const colours         = require('colors')
const express         = require('express')
// files
const tradeController = require('../controllers/tradeController')
// const vars
const router          = express.Router()

router.route('/')
  .get(
    tradeController.getAllTrades
  );
  
module.exports = router;