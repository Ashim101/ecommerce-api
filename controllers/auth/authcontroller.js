import { User } from "../../models"
import customserrorhandler from "../../services/customerrorhadler";

const authcontroller = {
    async me(req,res,next){
        var user;
      try{
         user = await User.findOne({_id:req.user._id}).select('-password -createdAt -updatedAt -__v');
      }
      catch(err)
      {
        return next(customserrorhandler.notfound());
      }
      if(!user)
      {
        return next(customserrorhandler.notfound());
      }

      res.json({user});

    
    }
}
export default authcontroller;