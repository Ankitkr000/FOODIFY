const mongoose=require("mongoose")

const itemModel=new mongoose.Schema({
        name:{
            type:String, required:true
        },

        foodType:{
            type:String,
            enum:["veg","non-veg"],
            required:true
        },

        price:{
            type:Number,
            min:0,
            required:true
        },
        categories:{
            type:String,
            enum:[
                "Snacks","Desserts", "Main Course", "Pizza", "Burgers", "Sandwiches", "South Indians", "North Indians", "Fast Food","Other"
            ],
            required:true
        },

        foodImage:{
            type:String, required:true
        },
        // rating:{
        //     type:Number,
        //     min:0,
        //     max:5,
        //     required:true
        // },
        shop:{  // kon sa shop iss item ko use kar raha h , uss shop ka reference do..
            type:mongoose.Schema.Types.ObjectId,
            ref:"Shop"
        }
 
})
 
const Item=mongoose.model("Item",itemModel)

module.exports = Item;