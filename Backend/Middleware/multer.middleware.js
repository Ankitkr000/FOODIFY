
const multer=require("multer")

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"/public")  // this callback take 2 paramter- "error" and "designation"
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
    
// })
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public")); // ✅ relative to project
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});



 
const upload =multer({storage})
module.exports={upload}