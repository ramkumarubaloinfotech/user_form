const app = require("./app")
const connectDB =  require("./config/db")


app.listen(5000, async() => {
    try {
        await connectDB()
        console.log("Server Connected Successfully")
    }
    catch (err) {
        console.log(err)
    }
})