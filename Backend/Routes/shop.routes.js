const express=require("express")
const shopRoute=express.Router()

const {registerShop,editShop, getMyShop, showShopToUser}=require("../Controllers/shop.controller")
const {authMiddleware}=require("../Middleware/auth.middleware")
const {upload} =require("../Middleware/multer.middleware")

shopRoute.post("/register-shop",authMiddleware,upload.single("shopImage") ,registerShop)
shopRoute.post("/edit-shop",upload.single("shopImage"),authMiddleware,editShop)
shopRoute.get("/get-my-shop",authMiddleware,getMyShop)


shopRoute.post("/show-shop-to-user",authMiddleware,showShopToUser)  //why post req ? => becoz userCity ko dena padega iss controller ko

module.exports=shopRoute