const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_STRING)
        console.log(`MongoDB Connected: ${conn.connection.host}`.white)
    } catch(err) {
        console.log(`${err}`.red)
        process.exit(1)
    }
}

module.exports = connectDB