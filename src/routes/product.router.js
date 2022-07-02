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
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
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
 * Get all products
 * 
 * GET
 * /api/products?page=&limit=&category_id=&
 * 
 */
router.get('/', async (req, res) => {

    let page = 1, limit = 10, query = {};

    if (req.query.page) page = req.query.page.toString();
    if (req.query.limit) limit = req.query.limit.toString();
    if (req.query.category_id) query.category = Number.parseInt(req.query.category_id.toString());

    try {
        const products = await productService.getAllProducts(query, page, limit);
        if (products.docs.length <= 0) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tìm thấy danh sách sản phẩm yêu cầu.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            products: products.docs,
            pagination: {
                ...products,
                docs: null
            }
        }));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


/**
 * Get product by id
 * 
 * GET
 * /api/products/id
 * 
 */
 router.get('/:id', async (req, res) => {

    const productId = req.params.id;

    try {
        const product = await productService.getProductById(productId);
        if (!product) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tìm thấy sản phẩm yêu cầu.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            product
        }));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});

export default router;