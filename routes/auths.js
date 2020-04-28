// Modules
const express           = require('express')
// Files
const auth              = require('../middlewares/auth')
const authController    = require('../controllers/authController')
// const vars
const router            = express.Router()

router.route('/register')
    .post(authController.registerUser)

router.route('/login')
    .post(authController.loginUser)

router.route('/forgotpassword')
    .post(authController.forgotPassword)

router.route('/resetpassword/:resetToken')
    .put(authController.resetPassword)

router.route('/currentUser')
    .get(
        auth.protect,
        authController.currentUser
    )

module.exports = router;