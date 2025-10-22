const nodemailer=require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // issi EMAIL se mail send hoga , baki ko ...
    pass: process.env.PASS, // this is APP PASSWORD , 
  },
});

const sendOTPMail=async(to,otp)=>{
    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Reset Your Password",
        text:`OTP:${otp}`,
        html: `<p>OTP: <b>${otp}</b></p>`
    });
}

module.exports={sendOTPMail}