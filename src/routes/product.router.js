import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import productService from '../services/product.service.js';
import responseFormat from '../shared/responseFormat.js';
import { validate, schemas } from '../middlewares/validation.js';
import { jwtAuth } from '../middlewares/auth.js';
import { isPrimaryCategory } from '../models/enums.js'

//define constant
const router = Router();


/**
 * Create product
 * 
 * POST
 * /api/products
 * 
 */
router.post('/', jwtAuth(), validate(schemas.createProduct), async (req, res) => {
    
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

        return res.status(StatusCodes.CREATED).json(responseFormat(true, {} , {
            product: newProduct
        })).end();

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

/**
 * Get all products
 * 
 * GET
 * /api/products?name=&page=&limit=&category_id=&
 * 
 */
router.get('/', async (req, res) => {

    let page = 1, limit = 10, query = {};

    if (req.query.page) page = req.query.page.toString();
    if (req.query.limit) limit = req.query.limit.toString();
    if (req.query.category_id) query.category = Number.parseInt(req.query.category_id.toString());
    if (req.query.name) query.name = new RegExp(req.query.name, 'i');

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


/**
 * Update product
 * 
 * PATCH
 * /api/products
 * 
 */
 router.patch('/', jwtAuth(), async (req, res) => {
    try {
        const isUpdated = await productService.updateProduct(req.body);

        if (!isUpdated) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Sản phẩm ' + req.body.id + ' không tồn tại.' 
            }, {})).end();

        const newProduct = await productService.getProductById(req.body.id);
        return res.status(StatusCodes.OK).json(responseFormat(true, {} , { product: newProduct }));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


/**
 * Delete one product
 * 
 * DELETE
 * /api/products/{id}
 * 
 */
router.delete('/:id', jwtAuth(), async (req, res) => {
    const productId = req.params.id;
    try {
        const isDeleted = await productService.deleteProduct(productId);

        if (!isDeleted) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Sản phẩm ' + productId + ' không tồn tại.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , { message: "Đã xóa." }));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});

/**
 * Delete multi product
 * 
 * DELETE
 * /api/products
 * 
 */
 router.delete('/', jwtAuth(), async (req, res) => {
    const productIds = req.body;
    try {
        const isDeleted = await productService.deleteProducts(productIds);

        if (!isDeleted) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh sách có chứa sản phẩm không tồn tại.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , { message: "Đã xóa." }));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});

export default router;