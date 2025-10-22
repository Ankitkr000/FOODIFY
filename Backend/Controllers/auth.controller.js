
const bcrypt =require("bcryptjs")
const userModel=require("../Models/user.model")
const jwt=require("jsonwebtoken");
const { sendOTPMail } = require("../utils/mail");


const signUp=async(req,res)=>{
    try {
        const {name,email,password,mobile,role}=req.body;

        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({ success:false,message:"User already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
 
       const newUser=new userModel({
                                name,
                                email,
                                password:hashedPassword,
                                mobile,
                                role})

        await newUser.save()  // async operation , data validation as in schema, mongodb connect, sending query to insert document in mongodb, HAPPEN IN THIS LINE , "save()"- returns a PROMISE

        res.status(201).json({success:true,message:"Sign up done successfully",newUser})
        
    } catch (error) {
        res.status(500).json({ success:false,message:"Internal Server Error",error:error.message})
    }
}

const login=async(req,res)=>{
  
    try {
        const {email,password}=req.body

        const userExist=await userModel.findOne({email})

        if(!userExist){
            return res.status(401).json({message:"User does not exist"})
        }
        const isPasswordValid=await bcrypt.compare(password,userExist.password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const payload={id:userExist.id, email:userExist.email}

        const token=jwt.sign(payload, process.env.SECRET_KEY,{expiresIn:"1d"})

        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",  
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

    
        return res.status(200).json({success:true, message:"Login Successfull",userExist})
        
        
    } catch (error) {
        console.log("from login catch")
        console.error("ERROR IN LOGIN :",error)
        return res.status(500).json({success:false, message:"Internal Server Error",error:error.message})
    }
    
}

const logout=(req,res)=>{
    try {   
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        
        res.status(200).json({success:true, message:"Logout Successfull"})
        
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error",error:error.message})
        res.status(500).json({success:false, message:"Internal Server Error",error:error.message})
        
    }
}   











// RESET PASSWORD LOGIC - 

const sendOtp=async(req,res)=>{
    try {
        const {email}=req.body
        console.log("from sentOTP contoller ")
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).json({success:false, message:"User Not found"})
        }
        const otp=Math.floor(1000 + Math.random()*9000).toString()
        user.resetOTP = otp;  // 📌 IMP STEP 
        await user.save();    // 📌 IMP STEP
        await sendOTPMail(email,otp)
        res.status(200).json({success:true,message:"OTP sent successfully"})
        
    } catch (error) {
        console.error("ERROR IN SEND OTP ",error)
        res.status(500).json({success:false, message:"Internal Server Error",error:error.message})
        
    }
}

// let otp = new Map();  // another way to handle OTP part...

const verifyOTP=async(req,res)=>{
    try {
        const {email,otp}=req.body
        const user=await userModel.findOne({email})
        
        if(!user){
            return res.status(404).json({success:false, message:"User Not found"}) 
        }
        
        if(user.resetOTP!=otp){
            return res.status(400).json({success:false, message:"Invalid OTP"})
        }
        user.isOTPVerified=true

        user.resetOTP=undefined
        await user.save()
        console.log("from verify otp")
       return res.status(200).json({success:true, message:"OTP Verified Successfully"})    
    } catch (error) {
        console.error("ERROR FROM VERIFY OTP :",error)
       return res.status(500).json({success:false, message:"Internal Server Error",error:error.message})
       
    } 
}

const resetPassword=async(req,res)=>{
    try {
        const {email,confirmPassword}=req.body
        
        const user=await userModel.findOne({email})
        if(!user || !user.isOTPVerified){
            return res.status(404).json({success:false, message:"OTP Verification required"})
        }   
        
        const newHashedPassword=await bcrypt.hash(confirmPassword,10)
        user.password=newHashedPassword
        user.isOTPVerified=false
        await user.save()
        return res.status(200).json({success:true,message:"Password Reset Successfully"})
        
        
    } catch (error) {
        console.error("ERROR IN RESET PASSWORD",error)
        return res.status(500).json({success:false, message:"Internal Server Error",error:error.message})
    }
}


const handleGoogleAuth = async (req, res) => {
  try {
    const { name, email, mobile, role } = req.body;

    let user = await userModel.findOne({ email });  //USING SAME NAME "user" 📌📌✅✅

    // If user doesn't exist, create a new one
    if (!user) {
      user = new userModel({ name, email, mobile, role });
      await user.save();
      console.log("New user created in MongoDB ✅");
    }


    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

    
    res.cookie("token", token, {
      httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
       maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({ success: true, message: "GoogleAuth Login Successful", user});
  } catch (error) {
    console.error("ERROR FROM handleGoogleAuth :",error)
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


module.exports={
    signUp,
    login,
    logout,


    sendOtp,
    sendOTPMail,
    verifyOTP,
    resetPassword,

    handleGoogleAuth

}

