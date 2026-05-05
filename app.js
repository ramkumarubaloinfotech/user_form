const express =  require("express")
const cors = require("cors")
const app = express()
const userRoutes = require("./routes/userRoute")

app.use(cors({
    origin : '*',
    credentials : true
}))
app.use(express.json())
app.use(userRoutes)

module.exports = app