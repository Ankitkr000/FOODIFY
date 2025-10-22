const express=require("express")
const {authMiddleware} = require("../Middleware/auth.middleware")
const { getCurrentUser } = require("../Controllers/user.controller")

const userRoute=express.Router()

userRoute.get("/current-user",authMiddleware,getCurrentUser)

module.exports=userRoute