const app = require("./app")
const connectDB =  require("./config/db")

connectDB()

app.listen(5000, () => {
    try {
        console.log("Server Connected Successfully")
    }
    catch (err) {
        console.log(err)
    }
})