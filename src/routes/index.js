// Modules
const express         = require('express')
// const vars
const router          = express.Router({ mergeParams: true })

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Stock Trades API' });
});

module.exports = router;