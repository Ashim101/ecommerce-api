const multer = require('multer');

import Joi from "joi";
import { DB_URL } from "../../config";
import {User} from "../../models";
import customserrorhandler from "../../services/customerrorhadler";
import bcrypt from 'bcrypt';
import Jwtservice from "../../services/JWTService";
import path from 'path';
import fs from 'fs';


const storage = multer.diskStorage({
    destination: (req,file,cb)=> cb(null,'profile/'),
    filename: (req,file,cb)=>{
    const uniquename=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`    
        cb(null,uniquename);
    }
    
    });
const handleMultipartdata= multer({storage,limits:{fileSize:1000000*10}}).single('image');
const registerSchema = Joi.object(
    {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_passsword: Joi.ref('password'),


    }
);
const registercontroller ={
   async register (req,res,next) {
    var filepath;
    handleMultipartdata(req,res,async (err)=>{
        if(err)
        {
            return next(err);
        }

         filepath = req.file.path;
         const { error } = registerSchema.validate(req.body);


        if(error)
        {
            fs.unlink(`${approot}/${filepath}`,(err)=>{
                if(err)
                {
                    return next(err);
                }
            })
            return next(error);


        }
        try{
            const exist= await User.exists({email:req.body.email});
       
           if(exist)
           { 
               fs.unlink(`${approot}/${filepath}`,()=>{
                   if(err)
                   {
                       return next(err);
                   }
               })
               return next(customserrorhandler.alreadyexist("This email already exist"));
       
           }
       }catch(err){
       
       return next(err);
       }
const hashed_password= await bcrypt.hash(req.body.password, 10);
const {name, email}= req.body;
const user=new User({
name,
email,
password: hashed_password,
image:filepath
});
let access_token;
try{
const result = await user.save();
access_token=Jwtservice.sign({_id:result._id, role:result.role})

}catch(err){
return next(err);
}

        res.json({access_token});
    })
        





    }
}
export default registercontroller;