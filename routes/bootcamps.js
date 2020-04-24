// Modules
const express               = require('express')
// files
const bootcampController    = require('../controllers/bootcampController')
// Include other resource routers
const courseRouter          = require('./courses')
// const vars
const router                = express.Router()

// re-reouting
router.use('/:bootcampId/courses', courseRouter)

router.route('/')
    .get(bootcampController.getBootcamps)
    .post (bootcampController.createBootcamp)

router
    .route("/:id")
    .get(bootcampController.getBootcampById)
    .put(bootcampController.updateBootcamp)
    .delete(bootcampController.deleteBootcamp);

router
    .route('/radius/:zipcode/:distance')
    .get(bootcampController.getBootcampByRadius)

module.exports = router