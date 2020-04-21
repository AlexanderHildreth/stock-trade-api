// Modules
const dotenv    = require('dotenv')
const express   = require('express')
const morgan    = require('morgan')

// loading files
dotenv.config({ path: './config/config.env' })
const bootcamps = require('./routes/bootcamps')

// const vars
const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
if(process.env.NODE_ENV ==='development') {
    app.use(morgan('dev'))
} 

// routes
app.use('/api/v1/bootcamps', bootcamps)

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))