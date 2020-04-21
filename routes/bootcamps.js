// Modules
const express   = require('express')

// files
const bootcampController = require('../controllers/bootcampController')

// const vars
const router    = express.Router()

// Get
router.get('/', bootcampController.getBootcamps)

/*router.route('/:id')
    .get(
    ).put(
    )

router.get('/:name', (req, res) => {

})

// Create
router.route('/create')
    .post(
    )

// Remove
router.route('/delete/:id')
    .delete(
    )*/

module.exports = router