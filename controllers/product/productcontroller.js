const multer = require('multer');

// import multer from "multer";
import path from 'path';
import { productschema } from "../../models";
import fs from 'fs';
import product from "../../models/product";
import customserrorhandler from "../../services/customerrorhadler";
import productSchema from "../../validators/productValidators";



const storage = multer.diskStorage({
destination: (req,file,cb)=> cb(null,'uploads/'),
filename: (req,file,cb)=>{
const uniquename=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`    
    cb(null,uniquename);
}

});
const handleMultipartdata= multer({storage,limits:{fileSize:1000000*10}}).single('image');
const productcontroller = {

  async add(req,res,next){

    handleMultipartdata(req,res,async (err)=>{
        if(err)
        {
            return next(err);
        }

        const filepath = req.file.path;

        const {error}= productSchema.validate(req.body);
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
        const{name,price,size}= req.body;
        let document;
        try{
document = await product.create({

    name,
    price,
    size,
    image:filepath,
})

        }catch(err){

        }
        res.json({});
    });

  




  },

  async update(req,res,next){

    handleMultipartdata(req,res,async (err)=>{
        if(err)
        {
            return next(err);
        }
        let filepath
        if(req.file)
        {
            filepath = req.file.path;
        }

 
        const {error}= productSchema.validate(req.body);
        if(error)
        {
            if(req.file)
            {
            fs.unlink(`${approot}/${filepath}`,(err)=>{
                if(err)
                {
                    return next(err);
                }
            })
        }
            return next(error);


        }
        const{name,price,size}= req.body;
        let document;
        try{
document = await product.findOneAndUpdate({_id:req.params.id},{

    name,
    price,
    size,
 ...(req.file && {image:filepath})
},{new:true})

        }catch(err){

        }
        res.json({document});
    });

  




  },

  async destroy(req,res,next){
    let document;
    try{
 document = await product.findOneAndDelete({_id:req.params.id});
    }
    catch(err){
        return next(err);
    }
    if(!document)
    {
        return next(new Error("Nothing to delete"));
    }
const imagepath = document.image;
fs.unlink(`${approot}/${imagepath}`,(err)=>{

    if(err)
    {
        return next(err);
    }
})
res.json({document});

  },
  async index(req,res,next){

const document = await product.find();
res.json(document);
  },
  async singleindex(req,res,next){
    let document;
try{
     document = await product.findOne({_id:req.params.id});
}
catch(err)
{
    return next(err);
}
    res.json(document);
      }



}

export default productcontroller;