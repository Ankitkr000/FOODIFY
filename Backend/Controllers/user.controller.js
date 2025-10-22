const getCurrentUser=(req,res)=>{
    try {
        const {user}=req

        if(!user){
            return res.status(404).json({success:false ,message:"User Not Found"})
        }
        return res.status(200).json({success:true,user})
        
    } catch (error) {
        console.log("Error in getCurrentUser: ",error)
        return res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}



module.exports={getCurrentUser}