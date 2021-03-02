// Modules
const colours         = require('colors')
const express         = require('express')
// files
const tradeController = require('../controllers/tradeController')
// const vars
const router          = express.Router()

router.post('/', (req, res) => {
    tradeController.createTrade(req)
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(400));
  });
  
  router.get('/', (req, res) => {
    tradeController.getAllTrades(req)
      .then(output => res.json(output))
      .catch(() => res.sendStatus(400));
  });
  
  router.get('/users/:userId', (req, res) => {
    tradeController.getTradesByUserId(req, req.params.userId)
      .then(output => res.json(output))
      .catch(err => {
        if (err === 404) return res.sendStatus(404);
        // console.error(`${err}`.red)
        res.sendStatus(400);
      });
  });
  
  module.exports = router;