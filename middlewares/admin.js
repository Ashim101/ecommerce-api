import { User } from "../models"
import user from "../models/user";
import customserrorhandler from "../services/customerrorhadler";
const admin = async(req,res,next)=>{

   const user= await User.findOne({_id:req.user._id});
    if(user.role == "admin")
    {
        next();
    }
    else{
        return next(customserrorhandler.unAuthorized());
    }


}
export default admin;