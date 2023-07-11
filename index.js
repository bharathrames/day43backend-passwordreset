import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import dataBaseConnection from './db.js';
import { userSignupRouter } from './routers/Signup.js';
import { forgotPasswordRouter } from './routers/Forgot.js';
import { resetPasswordRouter } from './routers/Verify.js';


const app = express()
// env configuration
dotenv.config()

// database connection
dataBaseConnection()

// middlewares
app.use(cors({
    origin:"https://passwordreset123.netlify.app"
}))
app.use(express.json())

// Routers
// signup router
app.use("/user",userSignupRouter)

// forgot router
app.use("/forgot",forgotPasswordRouter)
app.use("/verifyotp",resetPasswordRouter)
       


app.listen(process.env.PORT,()=>console.log(`server started at ${process.env.PORT}`))