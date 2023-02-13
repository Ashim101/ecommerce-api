import Joi from "joi";
import Jwtservice from "../../services/JWTService";
import refreshtoken from "../../models/refreshtoken";
import { REFRESH_SECRET } from "../../config";
import customserrorhandler from "../../services/customerrorhadler";
import { Refreshtoken, User } from "../../models";
const refreshcontroller={

async refresh(req,res,next){
    const refreshSchema = Joi.object(
        {
            refreshtoken: Joi.string().required(),
         
        }
    );
    const {error}= refreshSchema.validate(req.body);
if(error)
{
    return next(error);
}
let userid;
let refreshtoken;
try{

    refreshtoken =await Refreshtoken.findOne({token:req.body.refreshtoken})
    if(!refreshtoken)
    {
        return next(customserrorhandler.unAuthorized("Invalid refresh token"));
    }
    try{
        const{_id}=  await Jwtservice.verify(refreshtoken.token,REFRESH_SECRET);

    userid = _id;
    }
    catch(err){
        return next(err);
    }

const user= User.findOne({_id:userid});
if(!user)
{
    return next(customserrorhandler.unAuthorized("User not found"));
}
const access_token=Jwtservice.sign({_id:user._id,role:user.role})
const refresh_token=Jwtservice.sign({_id:user._id,role:user.role},'1y',REFRESH_SECRET);

try{
    const refresh = Refreshtoken.create({token: refresh_token});
    await Refreshtoken.deleteOne({token: refreshtoken.token});
    }
    catch(err){
    return next(err);
    }
    
    
    res.json({access_token,refresh_token});
}catch(err){
    return next(customserrorhandler.unAuthorized("Something went wrong"

    ));
};






}

}


export default refreshcontroller;