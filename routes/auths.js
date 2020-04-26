// Modules
const express           = require('express')
// Files
const authController    = require('../controllers/authController')
// const vars
const router            = express.Router()

router.route('/register')
    .post(authController.registerUser)
router.route('/login')
    .post(authController.loginUser)

module.exports = router;