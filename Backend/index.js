const express=require("express");
const dotenv=require("dotenv");
dotenv.config()
const connectDB = require("./config/db");
const cors=require("cors")
const cookieParser = require("cookie-parser");

connectDB()

const app=express();
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"https://foodify-flame-mu.vercel.app",
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))
const authRouter=require("./Routes/auth.routes");
const userRoute=require("./Routes/user.routes")
const shopRoute=require("./Routes/shop.routes")
const itemRoute=require("./Routes/item.routes")
app.use("/api/auth",authRouter)
app.use("/api/user",userRoute)
app.use("/api/shop",shopRoute)
app.use("/api/item",itemRoute)




app.get("/",(req,res)=>{
    console.log("From root page")
      res.status(200).json({ success: true, message: "Welcome to the root page" });

})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})

