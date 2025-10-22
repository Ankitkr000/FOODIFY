const mongoose=require("mongoose")

const shopModel=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },

        shopImage:{
            type:String, required:true
        },

        foodItems:[   // 📌  foodItem is array becoz , "1 shop can make multiple foods"
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Item"
            }
        ]
})



const shop=mongoose.model("Shop",shopModel)
module.exports = shop;