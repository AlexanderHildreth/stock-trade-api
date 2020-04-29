const fs        = require('fs')
const mongoose  = require('mongoose')
const colours   = require('colors')
const dotenv    = require('dotenv')

// files
dotenv.config({ path: './config/config.env' })
const Bootcamp  = require('./models/Bootcamp')
const Course    = require('./models/Course')
const Review    = require('./models/Review')
const User      = require('./models/User')

// DB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Importing data
const importData = async() => {
    const bootcamps = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
    );
    
    const courses = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
    );
    
    const users = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
    );
    
    const reviews = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
    );

    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        await Review.create(reviews)
        await User.create(users)
        
        console.log('[database] Data imported...'.cyan.bold.underline)
        process.exit()
    } catch (error) {
        console.error(error.red)
    }
}

// Deleting data
const deleteData = async() => {
    try {
        await Bootcamp.deleteMany()
        await Course.deleteMany()
        await Review.deleteMany()
        await User.deleteMany()

        console.log('[database] Data destroyed...'.cyan.bold.underline)
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
