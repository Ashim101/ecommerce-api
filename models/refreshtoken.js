import { string } from "joi";
import mongoose from "mongoose";


const refreshschema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },

    }


);


export default mongoose.model('Refreshtoken',refreshschema,'refreshtokens');