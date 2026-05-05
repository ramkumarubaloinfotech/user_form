const express = require("express")
const userModel = require("../models/userModel")

// Get Users
exports.getUser = async(req, res) => {
    try {
        const { page = 1, limit = 5, search = "" } = req.query
        const skip = (Number(page) - 1) * Number(limit)

        let query = {}
        const escapeRegex = (text) => {
            return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        }
        if (search) {
            const safeSearch = escapeRegex(search.trim())
            query.$or = [
                { email : { $regex : safeSearch, $options : "i" } },
                { phone : { $regex : safeSearch, $options : "i" } }
            ]
        }

        const users = await userModel.find(query).skip(skip).limit(Number(limit))
        const total = await userModel.countDocuments(query)
        const totalPages = Math.ceil(total / Number(limit))

        res.status(200).json({
            message : "User Details Received Successfully",
            total,
            page : Number(page),
            limit : Number(limit),
            totalPages,
            users

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message :  "Error Occured in Fetching Users"
        })
    }
}

// Post Users
exports.postUser = async(req, res) => {
    try {
        const { email, phone, ...rest } = req.body

        const exsitingEmail = await userModel.findOne({ email })
        if (exsitingEmail) {
            return res.status(400).json({
                message : "Email Id Already Exists"
            })
        }

        const exsitingPhone = await userModel.findOne({ phone })
        if (exsitingPhone) {
            return res.status(400).json({
                message : "Phone Number Already Exists"
            })
        }

        if (Array.isArray(req.body)) {
            await userModel.insertMany(req.body)
        }
        else {
            const users = new userModel({
            email,
            phone,
            ...rest
        })
        await users.save()}

        res.status(200).json({
            message : "User Details Created Successfully"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message : "Error Occured in Creating Users"
        })
    }
}

// Put Users
exports.putUser = async(req, res) => {
    try {
        const userId = req.params.id
        const { hobby, hobbies, ...rest } = req.body
        const updateData = {}

        // Single Values in Hobby
        if (hobby) {
            updateData.$addToSet = {
                hobbies : hobby
            }
        }

        // Multiple Value in Hobby
        if (hobbies) { 
            updateData.$addToSet = {
                hobbies : { $each : hobbies }
            }
        }

        // Rest of the Fields
        if (Object.keys(rest).length > 0) {
            updateData.$set = rest
        }

        const users = await userModel.findByIdAndUpdate(userId, updateData)

        res.status(200).json({
            message : "User Details Updated Successfully"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message : "Error Occured in Updating Users"
        })
    }
}

// Delete Users
exports.deleteUser = async(req, res) => {
    try {
        const userId = req.params.id
        const users =  await userModel.findByIdAndDelete(userId)

        res.status(200).json({
            message : "User Details Deleted Successfully "
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message : "Error Occured in Deleting Users"
        }) 
    }
}