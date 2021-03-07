const fs        = require('fs')
const mongoose  = require('mongoose')
const colours   = require('colors')
const dotenv    = require('dotenv')

// files
dotenv.config({ path: __dirname + '/config/config.env' })
const Trades = require('./src/models/Trades')
const Users  = require('./src/models/Users')

// DB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Importing data
const importData = async() => {
    const trades = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/post-trades.json`, "utf-8")
    );
    
    const Users = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
    );

    try {
        await Trades.create(trades)
        await User.create(Users)
        
        console.log('[DATABASE] Data imported...'.cyan.bold.underline)
        process.exit()
    } catch (error) {
        console.error(error.red)
    }
}

// Deleting data
const deleteData = async() => {
    try {
        await Trades.deleteMany()
        await Users.deleteMany()

        console.log('[DATABASE] Data destroyed...'.cyan.bold.underline)
        process.exit()
    } catch (error) {
        console.error(error.red)
    }
}

if (process.argv[2] === "-i" || process.argv[2]  === "--import") {
    importData()
} else if (process.argv[2] === "-d" || process.argv[2] === "--delete") {
    deleteData()
}