// Modules
const express               = require('express')
// files
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
    .post (bootcampController.createBootcamp)

router
    .route("/:id")
    .get(bootcampController.getBootcampById)
    .put(bootcampController.updateBootcamp)
    .delete(bootcampController.deleteBootcamp);

router
    .route('/radius/:zipcode/:distance')
    .get(bootcampController.getBootcampByRadius)

router
    .route('/:id/photo')
    .put(bootcampController.bootcampFileUpload)

module.exports = router