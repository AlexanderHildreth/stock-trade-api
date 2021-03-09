// Modules
const express         = require('express')
// files
const tradeController = require('../controllers/tradeController')
// const vars
const router          = express.Router()

router.route('/')
  .delete(tradeController.deleteAllTrades)

  
module.exports = router;