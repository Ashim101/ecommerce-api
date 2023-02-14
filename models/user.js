import { string } from "joi";
import mongoose from "mongoose";
// import { Appurl } from "../config";


const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "customer"
    },
    image: {
        type: String,
        // get: (image)=>{return `${Appurl}/${image}`}
    }
    },{
        timestamps: true,
        // toJSON: {getters:true}
    }


);


export default mongoose.model('User',userschema,'users');