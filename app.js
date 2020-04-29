// Modules
const dotenv            = require('dotenv')
const cookieParser      = require('cookie-parser')
const colours           = require('colors')
const express           = require('express')
const fileUpload        = require('express-fileupload')
const fs                = require('fs')
const morgan            = require('morgan')
const path              = require('path')
// loading files
dotenv.config({ path: './config/config.env' })
const connectDB         = require('./config/db')
const errorHandler      = require('./middlewares/error')
const auths             = require('./routes/auths')
const bootcamps         = require('./routes/bootcamps')
const courses           = require('./routes/courses')
const reviews           = require('./routes/reviews')
const users             = require('./routes/users')
// const vars
const app               = express()
const PORT              = process.env.PORT || 5000
const accessLogStream   = fs.createWriteStream(path.join(__dirname, '/var/logs/access.log'), { flags: 'a' })

// App middlewares
app.use(express.json())
app.use(cookieParser())
connectDB()
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : //app.use(morgan('combined', { stream: accessLogStream }))
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

const server = app.listen(PORT, () => {
    console.log(`[app] Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold)
})

// Handle unhandles promis rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR: ${err.message}`.red)

    server.close(() => process.exit(1))
})