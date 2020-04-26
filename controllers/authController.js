// Files
const asyncHandler  = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')
const User          = require('../models/User')

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = asyncHandler(async(req, res, next) => {
    const { name, email, password, role } = req.body
    
    const registerUser = await User.create({
        name, 
        email,
        password,
        role
    })

    sendTokenResponse(registerUser, 200, res)
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body
    if(!email || !password ){
        return next(new ErrorResponse('Please provide email and password', 400))
    }
    
    const loginUser = await User.findOne({ email }).select('+password')
    if (!loginUser) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }
    
    const isMatch   = await loginUser.matchPassword(password)
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    sendTokenResponse(loginUser, 200, res)
})

// @desc    Get current logged in user
// @route   POST /api/v1/auth/currentUser
// @access  Private

exports.currentUser = asyncHandler(async(req, res, next) => {
    const currentUser = await User.findById(req.user.id)

    res.status(200)
        .json({
            success: true,
            data: currentUser
        })
})

const sendTokenResponse = (user, statusCode, res) => {
    const token     = user.getSignedJwttoken()
    const options   = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    process.env.NODE_ENV === 'production' ? options.secure = true : 

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}