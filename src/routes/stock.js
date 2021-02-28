// Modules
const express         = require('express')
// files
const stockController = require('../controllers/stockController')
// const vars
const router          = express.Router({ mergeParams: true })

// Stock Routes
router.get('/:symbol/trades', (req, res) => {
    stockController.filterStockBySymbol(req, req.params.symbol)
        .then(output => res.json(output))
        .catch(() => res.sendStatus(404));
});

router.get('/:symbol/price', (req, res) => {
    stockController.filterStockByPrice(req, req.params.symbol)
        .then(output => res.json(output))
        .catch(() => res.sendStatus(404));
});

module.exports = router;