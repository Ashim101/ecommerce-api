import Joi from "joi";
import { Refreshtoken, User } from "../../models";
import customserrorhandler from "../../services/customerrorhadler";
import bcrypt from 'bcrypt';
import Jwtservice from "../../services/JWTService";
import { REFRESH_SECRET } from "../../config";
import refreshtoken from "../../models/refreshtoken";
const logincontroller = {

    async login (req,res,next){
                
const loginSchema = Joi.object(
    {
        // name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }
);
const {error}= loginSchema.validate(req.body);
if(error)
{
    return next(error);
}
try{

const user = await User.findOne({email:req.body.email});
if(!user)
{
 return next(customserrorhandler.wrongcredentials());
}

const match =await bcrypt.compare(req.body.password,user.password );
if(!match)
{
    return next(customserrorhandler.wrongcredentials());
}

const access_token=Jwtservice.sign({_id:user._id,role:user.role})
const refresh_token=Jwtservice.sign({_id:user._id,role:user.role},'1y',REFRESH_SECRET);

try{
const refresh = Refreshtoken.create({token: refresh_token});
}
catch(err){

}


res.json({access_token,refresh_token});

}
catch(err){
    return next(err);
}


    },

async logout(req,res,next){

    const refreshSchema = Joi.object(
        {
            refreshtokken: Joi.string().required(),
         
        }
    );
    const {error}= refreshSchema.validate(req.body);
if(error)
{
    return next(error);
}
let refreshtken;
try{

    refreshtken =await Refreshtoken.findOne({token:req.body.refreshtokken})
    if(!refreshtken)
    {
        return next(customserrorhandler.unAuthorized("Invalid refresh token"));
    }
        await refreshtoken.deleteOne({token:refreshtken.token});


}catch(err)
{
    return next(err);
}

}




}
export default logincontroller;