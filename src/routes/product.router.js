import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import productService from '../services/product.service.js';
import responseFormat from '../shared/responseFormat';
import { validate, schemas } from '../middlewares/validation.js';

const router = Router();


//define route


/**
 * Create product
 * 
 * POST
 * /api/products
 * 
 */
router.post('/', validate(schemas.createProduct), async (req, res) => {
    
    try {
        const newProduct = await productService.createProduct(req.body);
        if (!newProduct) 
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Mã sản phẩm đã tồn tại' 
            }, {})).end();

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, {} , {
            product
        }));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

/**
 * Create product
 * 
 * GET
 * /api/products
 * 
 */
router.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({
        message: req.params.site
    }).end();
});

export default router;