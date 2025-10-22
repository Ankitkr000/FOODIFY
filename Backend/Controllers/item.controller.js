const cloudinaryUpload = require("../utils/cloudinary");
const itemModel=require("../Models/item.model")
const shopModel=require("../Models/shop.model")

const addItem=async(req,res)=>{
    try {
        const {name,foodType,price,categories}=req.body

        let cloudResult
        if(req.file){
            cloudResult=await cloudinaryUpload(req.file.path)
        }

        const ownerID=req.user.id
        const shopExist=await shopModel.findOne({owner:ownerID})
        if(!shopExist){
            return res.status(404).json({success:false, message:"Shop does NOT Exist"})
        }
        const shopID=shopExist._id //📌 IMP , issi shopID me food se link karna h , see item model , in that shop is also there ...
        const newItem=new itemModel({name,foodType,price,categories,foodImage:cloudResult.secure_url,shop:shopID}) //📌IMP- shopid is imp very , logic , 
        await newItem.save()

       //VERY IMP STEP 📌📌📌
        // it push the new item's ID to the shop's foodItems array
         shopExist.foodItems.push(newItem._id);
        await shopExist.save();
        return res.status(201).json({success:true, message:"Item Added successfully",newItem})
    } catch (error) {
        console.error("ERROR IN ADD-ITEM :",error)
        return res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}

const editItem=async(req,res)=>{
    try {
        const itemID=req.params.itemID
        const {name,foodType,price,categories}=req.body
        
        let image
        if(req.file){
            image=await cloudinaryUpload(req.file.path)
        }
        
        const updatedItem=await itemModel.findByIdAndUpdate(itemID,{name,foodType,price,categories,foodImage:image},{new:true})
        if(!updatedItem){
            return res.status(404).json({success:false, message:"Item does NOT Exist"})
        }
        
        return res.status(201).json({success:true, message:"Item Details Updated successfully",updatedItem})
    } catch (error) {   
        console.error("ERROR IN EDIT-ITEM :",error)
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}


module.exports={
    addItem,
    editItem
}