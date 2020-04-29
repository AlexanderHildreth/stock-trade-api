// Modules 
const jwt           = require('jsonwebtoken')
// Files
const asyncHandler  = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const User          = require('../models/User')

// Protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.token) {
        token = req.cookies.token
    }

    if(!token) return next(new ErrorResponse('Unauthorised access', 401))

    try {
        const decoded   = jwt.verify(token, process.env.JWT_SECRET)
        req.user        = await User.findById(decoded.id)
        next()
    } catch (error) {
        return next(new ErrorResponse('Unauthorised access', 401))
    } 
})

// Grant access to specific roles
exports.authorise = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`Unauthorised access for user role: ${req.user.role}`, 403))
        }
        next()
    }
}