const { Schema, model } = require("mongoose")

const userModel =  new Schema({
    name : { type : String, required : true },
    age : { type : Number, required : true },
    email : { type : String, required : true, unique : true },
    phone : { type : String, required : true, unique : true },
    hobbies : { type : [String], default : [] }
}, { timestamps : true })

module.exports = model("users", userModel)