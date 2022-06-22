import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import productService from '../services/product.service.js';
import responseFormat from '../shared/responseFormat.js';
import { validate, schemas } from '../middlewares/validation.js';
import { isPrimaryCategory } from '../models/enums.js'

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
    
    if (!isPrimaryCategory(req.body.category)) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
            message: 'Danh mục sản phẩm không hợp lệ' 
        }, {})).end();
    }

    try {
        const newProduct = await productService.createProduct(req.body);
        if (!newProduct) 
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Mã sản phẩm đã tồn tại' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            product: newProduct
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