// Modules
const express               = require('express')
// files
const auth                  = require('../middlewares/auth')
const Bootcamp              = require('../models/Bootcamp')
const bootcampController    = require('../controllers/bootcampController')
const customResults         = require('../middlewares/customResults')
// Include other resource routers
const courseRouter          = require('./courses')
// const vars
const router                = express.Router()

// re-reouting
router.use('/:bootcampId/courses', courseRouter)

router.route('/')
    .get(
        customResults(Bootcamp, 'courses'),
        bootcampController.getBootcamps
    )
    .post(
        auth.protect,
        bootcampController.createBootcamp
    )

router
    .route("/:id")
    .get(bootcampController.getBootcampById)
    .put(
        auth.protect,
        bootcampController.updateBootcamp
    )
    .delete(
        auth.protect,
        bootcampController.deleteBootcamp
    )

router
    .route('/radius/:zipcode/:distance')
    .get(bootcampController.getBootcampByRadius)

router
    .route('/:id/photo')
    .put(
        auth.protect,
        bootcampController.bootcampFileUpload
    )

module.exports = router