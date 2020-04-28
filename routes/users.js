// Modules
const express           = require('express')
// Files
const auth              = require('../middlewares/auth')
const authController    = require('../controllers/userController')
const customResults     = require('../middlewares/customResults')
const User              = require('../models/User')
// const vars
const router            = express.Router()

router.use(auth.protect)
router.use(auth.authorise('admin'))
router.route('/')
    .get(
        customResults(User),
        authController.getUsers
    )
    .post(authController.createUser)

router.route('/:id')
    .get(authController.getUserById)
    .put(authController.updateUser)
    .delete(authController.deleteUser)

module.exports = router
