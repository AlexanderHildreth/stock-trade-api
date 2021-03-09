// Modules
const express         = require('express')
// files
const stockController = require('../controllers/stockController');
const customResults   = require('../middlewares/customResults');
const Trade           = require('../models/Trade')
// const vars
const router          = express.Router()

// Stock Routes
router.route('/:symbol/price')
    .get(
        stockController.getStockFluxPriceByDate
    );

// router.get('/:symbol/stats', (req, res) => {
//     stockController.getStockStats
// });

module.exports = router;