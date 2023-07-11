import express from 'express'
import  Token  from '../module/Token.js'

const router = express.Router()

router.post("/:id",async(request,response)=>{
    try {

        // finding the user token
        const tokens = await Token.findById(request.params.id)
        if(!tokens){
            return response.status(400).json({message:"Password reset timed out"})
        }

        // verifying OTP
        if(tokens.token !== request.body.token){
            return response.status(400).json({message:"Wrong OTP"})
        }  

        response.status(200).json({message:"You can reset your password now"})


    } catch (error) {
        console.log("Internal Server Error",error)
        response.status(500).json({message:"Internal Server Error"})
    }
})


export const resetPasswordRouter = router;