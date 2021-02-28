// Modules
const dotenv            = require('dotenv')
dotenv.config({ path: __dirname + '/config/config.env' })
const bodyParser        = require('body-parser')
const colours           = require('colors')
const cookieParser      = require('cookie-parser');
const cors              = require('cors')
const express           = require('express')
const expressRateLimit  = require('express-rate-limit')
const helmet            = require('helmet')
const hpp               = require('hpp')
const morgan            = require('morgan')
const path              = require('path')
const xssClean          = require('xss-clean')
// loading files
const connectDB         = require('./config/db')
const errorHandler      = require('./middlewares/error')
const morganLogging     = require('./middlewares/morganLogging')
const index             = require('./routes/index')
const erase             = require('./routes/erase')
const stocks            = require('./routes/stocks')
const trades            = require('./routes/trades')
// const vars
const app               = express()
const limiter           = expressRateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100
})
const port              = process.env.PORT || 5000
const apiV              = process.env.API_V || 'v1'
const nodeEnv           = process.env.NODE_ENV

// App middlewares
nodeEnv === 'development' ? app.use(morganLogging) : app.use(morgan('combined'))
app.use(cors())
app.use(cookieParser());
app.use(helmet())
app.use(hpp())
app.use(limiter)
app.use(xssClean())
app.use(express.json())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

if(connectDB.createDbConn(app)) {
    console.log('[database] SQLite3 Connected'.cyan.underline.bold)
} else {
    server.close(() => process.exit(1))
}

// routes
app.use(`/api/${apiV}/`, index);
app.use(`/api/${apiV}/erase`, erase);
app.use(`/api/${apiV}/stocks`, stocks);
app.use(`/api/${apiV}/trades`, trades)

// Routes middlewares
app.use(errorHandler)

const server = app.listen(port, () => {
    console.log(`[app] Server running in ${nodeEnv} mode on port ${port}`.yellow.underline.bold)
})

// Handle unhandles promis rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR: ${err.message}`.red)

    server.close(() => process.exit(1))
})

module.exports = app