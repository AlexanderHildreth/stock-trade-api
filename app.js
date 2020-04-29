// Modules
const dotenv            = require('dotenv')
const cookieParser      = require('cookie-parser')
const colours           = require('colors')
const cors              = require('cors')
const express           = require('express')
const expressRateLimit  = require('express-rate-limit')
const fileUpload        = require('express-fileupload')
const helmet            = require('helmet')
const hpp               = require('hpp')
const fs                = require('fs')
const morgan            = require('morgan')
const mongoSanitize     = require('express-mongo-sanitize')
const path              = require('path')
const xssClean          = require('xss-clean')
// loading files
dotenv.config({ path: './config/config.env' })
const connectDB         = require('./config/db')
const errorHandler      = require('./middlewares/error')
const morganLogging     = require('./middlewares/morganLogging')
const auths             = require('./routes/auths')
const bootcamps         = require('./routes/bootcamps')
const courses           = require('./routes/courses')
const reviews           = require('./routes/reviews')
const users             = require('./routes/users')
// const vars
const app               = express()
const limiter           = expressRateLimit({
    windowMs: 10 * 60 * 1000, // !0 minutes
    max: 100
})
const port              = process.env.PORT || 5000
const accessLogStream   = fs.createWriteStream(path.join(__dirname, '/var/logs/access.log'), { flags: 'a' })

// App middlewares
process.env.NODE_ENV === 'development' ? app.use(morganLogging) : app.use(morgan('combined', { stream: accessLogStream }))
connectDB()
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(limiter)
app.use(mongoSanitize())
app.use(xssClean())
app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/api/v1/auth', auths)
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/reviews', reviews)
app.use('/api/v1/users', users)

// Routes middlewares
app.use(errorHandler)

const server = app.listen(port, () => {
    console.log(`[app] Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.underline.bold)
})

// Handle unhandles promis rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR: ${err.message}`.red)

    server.close(() => process.exit(1))
})

module.exports = server