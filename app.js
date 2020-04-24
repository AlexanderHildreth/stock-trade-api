// Modules
const dotenv        = require('dotenv')
const colours       = require('colors')
const express       = require('express')
const morgan        = require('morgan')

// loading files
dotenv.config({ path: './config/config.env' })
const connectDB     = require('./config/db')
const errorHandler  = require('./middlewares/error')
const bootcamps     = require('./routes/bootcamps')
const courses       = require('./routes/courses')

// const vars
const app = express()
const PORT = process.env.PORT || 5000

// App middlewares
app.use(express.json())
connectDB()
if(process.env.NODE_ENV ==='development') {
    app.use(morgan('dev'))
} 

// routes
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

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