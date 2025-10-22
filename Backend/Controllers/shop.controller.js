const cloudinaryUpload = require("../utils/cloudinary");
const shopModel=require("../Models/shop.model")

const registerShop=async(req,res)=>{
    try {
        const {name,city,state,address}=req.body

        let cloudResult;
        if(req.file){
            cloudResult =await cloudinaryUpload(req.file.path) //providing the path of the image
        }
        const owner=req.user.id //📌 THINK HERE, IMP CONCEPT

        const newShop=new shopModel({name,city,state,address,shopImage:cloudResult.secure_url, owner})
        await newShop.save()

        //.populate() only works after the document is saved or fetched from DB.
       const populatedShop = await newShop.populate("owner", "name email role");
        return res.status(201).json({success:true, message:"New Shop Added successfully",newShop:populatedShop})
        
    } catch (error) {
        console.error("Error in adding new shop :",error)
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}   

const editShop=async(req,res)=>{
    try {
        const {name,city,state,address}=req.body
        
        const ownerID=req.user.id //📌 THINK HERE,IMP CONCEPT

       const shopExist=await shopModel.findOne({name, owner:ownerID})
       if(!shopExist){
        return res.status(404).json({success:false, message:"Shop NOT found"})
       }

       const shopId=shopExist._id;
       const updatedShop=await shopModel.findByIdAndUpdate( shopId,{city,state,address},{new:true}) 
                                        .populate("owner","name","email")
    
       return res.status(200).json({success:true, message:"Shop Updated Successfully",updatedShop})
    } catch (error) {
        console.error("ERROR IN EDITING SHOP :",error)
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}


const getMyShop=async(req,res)=>{
    try {
        const ownerID=req.user.id
        const shopExist=await shopModel.findOne({owner:ownerID}).populate("owner foodItems")
        if(!shopExist){
            // return res.status(404).json({success:false, message:"SHOP DOES NOT EXIST"})
            return null
        }
        
        return res.status(200).json({success:true, message:"Shop fetched successfully", shopExist})
        
        
    } catch (error) {
        console.error("ERROR IN GETMYSHOP SHOP :",error)
        return res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}


const showShopToUser = async (req, res) => {
    try {
        const { userCity } = req.body;

        // Use case-insensitive regex for city match
        const allShops = await shopModel.find({
            city: { $regex: `^${userCity}$`, $options: "i" }
        }).populate("foodItems")
        console.log("hi-1")
        return res.status(200).json({ success: true, allShops });
    } catch (error) {
        console.error("ERROR IN showShopToUser controller :", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


module.exports={
    registerShop,
    editShop,
    getMyShop,

    showShopToUser
}