import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"


const app=express()
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
dotenv.config()

//! Database -------------------------
const db= async()=>{
    try {
        await mongoose.connect(process.env.CLUSTER)
        console.log(`db is connected`);
    } catch (error) {
        console.log(`Error in mongodb${error}`);
    }
}
db();

//!Importing Routes---------------------
import userRoutes from "./routes/userRoutes.js"




//!Routes--------------------------------
app.use('/api/v1/user',userRoutes)






//!Server---------------------------------

const server =app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
})


