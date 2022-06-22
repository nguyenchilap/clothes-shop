import responseFormat from '../shared/responseFormat.js';
import Joi from 'joi';

const schemas = {

    signUpSchema: Joi.object({
        email: Joi.string()
          .email()
          .lowercase()
          .required(),
        password: Joi.string()
          .min(6)
          .required(),
        confirm_password: Joi.ref('password'),
        name: Joi.string()
          .min(3)
          .required()
    }),
      
    signInSchema: Joi.object({
        email: Joi.string()
          .email()
          .lowercase()
          .required(),
        password: Joi.string()
          .min(6)
          .required(),
    }),

    createProduct: Joi.object({
        name: Joi.string()
          .required(),
        description: Joi.string()
          .required(),
        sku: Joi.string(),
        import_price: Joi.number()
          .min(1),
        export_price: Joi.number()
          .min(1),
        stock_quantity: Joi.number()
          .min(1),
        stock_available: Joi.boolean(),
        special_price: Joi.number(),
        promotion_begin_date: Joi.date(),
        promotion_end_date: Joi.date(),
        variants: Joi.array()
          .required(),
        parameters: Joi.array(),
        category: Joi.number()
          .required(),
        product_unit: Joi.number(),
        created_by: Joi.string(),
        // site: Joi.string()
        //   .required(),
        image: Joi.string()
          .required(),
        images: Joi.array()
          .items(Joi.string()),
    }),

}

function validate(schema) {
    return async (req, res, next) => {
      try {
        await schema.validateAsync(req.body, { allowUnknown: true });
        next();
      } catch (error) {
        res.json(responseFormat(false, { message: error.message }));
      }
    }
}
  
export { validate, schemas };