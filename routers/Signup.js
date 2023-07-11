import express from 'express'
import User from '../module/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

// user signup

router.post("/signup",async(request,response)=>{
    try {

        // finding if user already exists
        const user = await User.findOne({email:request.body.email})
        if(user){
            return response.status(400).json({message:"User Already Exist"})
        }

        // generate password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password,salt)

        // new password
        const newUser = await new User(
           { 
            name:request.body.name,
            email:request.body.email,
            password:hashedPassword
        
        }
        ).save()

        response.status(200).json({message:"Successfully Signed Up"})
        
    } catch (error) {
        
        console.log("Internal Server Error",error)
        response.status(500).json({message:"Internal Server Error"})
    }
})

// User Login
router.post("/login",async(request,response)=>{
    try {
     // validate the user
        
        const user = await User.findOne({email:request.body.email})
        if(!user){
            return response.status(400).json({message:"Invalid Email Or Password"})
        }

        // validate password
        const validatePassword = await bcrypt.compare(
            request.body.password,
            user.password
        )

        if(!validatePassword){
            return response.status(400).json({message:"Invalid Email Or Password"})
        }

        response.status(200).json({message:"Successfully LogedIn"})

        
    } catch (error) {
        console.log("Internal Server Error",error)
        response.status(500).json({message:"Internal Server Error"})
    }
})


export const userSignupRouter = router