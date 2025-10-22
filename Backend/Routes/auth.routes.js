const express=require("express")
// const authMiddleware=require("../Middleware/auth.middleware")

const { signUp, login, logout, sendOtp, verifyOTP, resetPassword, handleGoogleAuth } = require("../Controllers/auth.controller")

const app=express()
const authRouter=express.Router()


authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logout)


authRouter.post("/send-otp",sendOtp)
authRouter.post("/verify-otp",verifyOTP)
authRouter.post("/reset-password",resetPassword)

authRouter.post("/google-auth",handleGoogleAuth)

module.exports=authRouter
