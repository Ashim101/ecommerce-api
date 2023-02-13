import Joi from "joi";

const productSchema = Joi.object(
    {
        name: Joi.string().min(3).max(30).required(),
        size: Joi.string(),
        price: Joi.number().required(),
       }
);


export default productSchema;