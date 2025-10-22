const express=require("express")

const {addItem,editItem}=require("../Controllers/item.controller")
const {authMiddleware}=require("../Middleware/auth.middleware")
const {upload} =require("../Middleware/multer.middleware")
const itemRoute=express.Router()

itemRoute.post("/add-item",authMiddleware,upload.single("foodImage"),addItem)
itemRoute.post("/edit-item/:itemID",authMiddleware,upload.single("foodImage"),editItem)


module.exports=itemRoute