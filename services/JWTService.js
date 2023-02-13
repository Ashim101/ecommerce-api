import { JWT_SECRET,REFRESH_SECRET } from "../config";
import jwt from "jsonwebtoken";
class Jwtservice{
   static sign(payload, expiry=60,secret=JWT_SECRET){
      return jwt.sign(payload,secret,{expiresIn: expiry});
   }

   static verify(token,secret=JWT_SECRET){
         return jwt.verify(token,secret);


   }

}

export default Jwtservice;