import StatusCodes from 'http-status-codes';
import responseFormat from '../shared/responseFormat.js';
import Joi from 'joi';

const schemas = {

    createUser: Joi.object({
        email: Joi.string()
          .email()
          .lowercase()
          .required(),
        password: Joi.string()
          .min(6)
          .required(),
        confirm_password: Joi.ref('password'),
        name: Joi.string()
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
        description: Joi.string(),
        sku: Joi.string(),
        import_price: Joi.number()
          .min(1),
        export_price: Joi.number()
          .min(1),
        stock_quantity: Joi.number(),
        stock_available: Joi.boolean(),
        special_price: Joi.number(),
        promotion_begin_date: Joi.date(),
        promotion_end_date: Joi.date(),
        variants: Joi.array(),
        parameters: Joi.array(),
        category: Joi.number(),
        product_unit: Joi.string(),
        created_by: Joi.string(),
        image: Joi.string(),
        images: Joi.array()
          .items(Joi.string()),
        shop: Joi.string()
          .required()
    }),

    createShop: Joi.object({
      name: Joi.string()
          .required(),
      address: Joi.string()
          .required(),
      birth_day: Joi.date(),
      years_old: Joi.number()
    }),

    createSet: Joi.object({
      name: Joi.string()
          .required(),
      description: Joi.string(),
      sku: Joi.string(),
    }),

    createShift: Joi.object({
      from_date: Joi.string()
          .required(),
    })

}

function validate(schema) {
    return async (req, res, next) => {
      try {
        await schema.validateAsync(req.body, { allowUnknown: true });
        next();
      } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(responseFormat(false, { message: error.message }));
      }
    }
}
  
export { validate, schemas };