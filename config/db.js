const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        // await mongoose.connect("mongodb+srv://ramkumarubaloinfotech_db_user:ram282004@cluster0.fbmaesh.mongodb.net/User")
        await mongoose.connect("mongodb://localhost:27017/User")
        console.log("Database Connected Successfully")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectDB