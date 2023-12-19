import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default:'user'
    },
    username: { 
        type: String,
        // unique: true,
    },
    gender: {
        type: String,
        enum : ["male","female","others"],
    },
    profilePhoto: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    address: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    role: {
        type: String,
        enum : ["user","admin"],
        default:"user"
    },
    isVerified:{type:Boolean,default:false},

},{timestamps:true})

export default mongoose.model('user',userSchema)