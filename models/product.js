import mongoose from "mongoose";
import { Appurl } from "../config";


const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
    
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
        get: (image)=>{return `${Appurl}/${image}`}
    }
    },{
        timestamps: true,
        toJSON: {getters:true}
    }


);


export default mongoose.model('Product',productschema,'products');