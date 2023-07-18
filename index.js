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
app.use(cors())
app.use(express.json())

app.get("/", function (req, res) {
    res.send("<h1>passwordreset</h1>");
  });

// Routers
// signup router
app.use("/user",userSignupRouter)

// forgot router
app.use("/forgot",forgotPasswordRouter)
app.use("/verifyotp",resetPasswordRouter)
       


app.listen(process.env.PORT,()=>console.log(`server started at ${process.env.PORT}`))