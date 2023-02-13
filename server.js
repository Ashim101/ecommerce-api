import express from "express";
import { APP_PORT,DB_URL } from "./config";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import path from 'path';
// import mongoose from "mongoose";



const mongoose= require('mongoose');

global.approot = path.resolve(__dirname);



const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
mongoose.connect(DB_URL,{useNewUrlparser: true, useUnifiedTopology: true }).then(()=>console.log("Successful")).catch((err)=>console.log(err));

app.use('/api',routes);

app.use('/uploads', express.static('uploads'))

app.use(errorHandler);
app.listen(APP_PORT,()=>console.log(`listening on port ${APP_PORT}`)); 