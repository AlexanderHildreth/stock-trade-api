// Modules
const express         = require('express')
// files
const tradeController = require('../controllers/tradeController')
// const vars
const router          = express.Router({ mergeParams: true })

router.delete('/', (req, res) => {
    tradeController.deleteAllTrades(req)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400));
});
  
module.exports = router;