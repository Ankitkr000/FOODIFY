const { v2: cloudinary } = require('cloudinary');
const fs = require("fs");

const cloudinaryUpload = async (file) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    try {
        const result = await cloudinary.uploader.upload(file);
        fs.unlinkSync(file);
        // console.log("FROM CLOUDINARY.JS :", result);
        return result;
    } catch (error) {
        fs.unlinkSync(file);
        console.error("ERROR IN CLOUDINARY.JS FILE :", error);
        console.log(error);
    }
};

module.exports = cloudinaryUpload;