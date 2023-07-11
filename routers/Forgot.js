import express from 'express';
import  User  from '../module/User.js';
import mail from '../nodemailer.js';
import  Token  from '../module/Token.js';
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/",async(request,response)=>{
    try {

        // Finding the user
        const user = await User.findOne({email:request.body.email})
        if(!user){
            return response.status(400).json({message:"User Email Not Valid"})
        }
        // Generating random string
        const string = "abcdefghijklmnopqrstuvwxyz1234567890"
        const randomString = (OTPlength) => {
            let OTP = "";
            const stringlength = string.length;
            for(let index=0; index<OTPlength; index++){
                  OTP += string.charAt(Math.floor(Math.random()*stringlength))
            }
            return OTP;
        }
        const randomOTP = randomString(6)

        // Adds the token to the database
        const newToken = await new Token(
            {
              userId:user._id,
              token:randomOTP  
            }
        ).save()
        // sending mail
        mail(randomOTP,request.body.email)

        response.status(200).json({message:"OTP has been sent to your email",otp:newToken})
        
    } catch (error) {
        console.log("Internal Server Error",error)
        response.status(500).json({message:"Internal Server Error"})
    }
})


// reset password
router.put("/reset/:id",async(request,response)=>{
    try {

        // finding user
        const user = await User.findById(request.params.id)
        if(!user)return response.status(400).json({message:"User not valid"})


        // generate password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(request.body.password,salt)


        // Changing the password
        const resetPassword = await User.findByIdAndUpdate(
            {_id:request.params.id},
            {$set:{
                password:hashedPassword
            }},
            {new:true}
        )

        response.status(200).json({message:"Successfully reseted your password"})
        
    } catch (error) {
        console.log("Internal Server Error",error)
        response.status(500).json({message:"Internal Server Error"})
    }
})

export const forgotPasswordRouter = router;