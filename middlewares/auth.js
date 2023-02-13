import user from '../models/user';
import customerrorhandler from '../services/customerrorhadler'
import Jwtservice from '../services/JWTService';
const auth = async (req,res,next)=>{
             
     var authhead = req.headers.authorization;

        if(!authhead)
       {
        return next(customerrorhandler.unAuthorized());
       }
    const token = authhead.split(" ")[1];
try{
    const {_id,role} = await Jwtservice.verify(token);

   const user = {
        _id,
        role,
    };
req.user=user;
    next();
}
catch(err)
{  
  return next(customerrorhandler.unAuthorized());

}





    }

export default auth;