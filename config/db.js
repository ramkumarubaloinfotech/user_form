const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://ramkumarubaloinfotech_db_user:ram282004@cluster0.fbmaesh.mongodb.net/User")
        console.log("Database Connected Successfully")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectDB