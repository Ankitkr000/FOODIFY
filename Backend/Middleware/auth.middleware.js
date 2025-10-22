const jwt=require("jsonwebtoken")
const userModel=require("../Models/user.model")

const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return- res.status(400).json({success:false, message:"Token not found"})
        }

        let data
        try {
            
         data=jwt.verify(token,process.env.SECRET_KEY)
        } catch (error) {
            return res.status(404).json({success:false, message:"Invalid or expired Token"});
            
        }

        const user=await userModel.findById(data.id)
        if(!user){
         return res.status(404).json({success:false, message:"User not found"});
        }

        req.user=user;
        next()
        
    } catch (error) {
        console.log("ERROR IN AUTH MIDDLEWARE: ",error)
        return res.status(500).json({success:false,message:"Internal server error",error:error.message})
    }
}

module.exports={authMiddleware}