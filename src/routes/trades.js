// Modules
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
      .then(e => res.json(e))
      .catch(() => res.sendStatus(400));
  });
  
  router.get('/users/:userID', (req, res) => {
    tradeController.user(req, req.params.userID)
      .then(e => res.json(e))
      .catch(err => {
        if (err === 404) return res.sendStatus(404);
        res.sendStatus(400);
      });
  });
  
  module.exports = router;