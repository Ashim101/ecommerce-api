import {ValidationError} from "joi";
import { DEBUG_MODE } from "../config";
import customserrorhandler from "../services/customerrorhadler";
const errorHandler=(err, req ,res, next)=>{
let statuscode =500;
let data = {
    message: "Internal error",
    ...(DEBUG_MODE=== 'true' && {originalerror: err.message})

}

if(err instanceof ValidationError)
{
    statuscode = 400;
    data ={
        message: err.details[ 0 ].message
    }
}
if(err instanceof customserrorhandler)
{
    statuscode = err.status;
    data ={
        message: err.message
    }
}
return res.status(statuscode).json(data);

}

export default errorHandler;

