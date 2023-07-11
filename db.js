import mongoose from "mongoose";
import dotenv from 'dotenv'

// dot env configuration;
dotenv.config()



const dataBaseConnection =() => {
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try {
        mongoose.connect(process.env.MONGODB_URI,params)
    console.log("mongoDB connected")
        
    } catch (error) {
        console.log("Mongodb connection error",error)
    }
}


export default dataBaseConnection;