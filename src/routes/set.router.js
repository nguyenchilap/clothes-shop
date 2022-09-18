import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import setService from '../services/set.service.js';
import responseFormat from '../shared/responseFormat.js';
import { validate, schemas } from '../middlewares/validation.js';

//define constant
const router = Router();


/**
 * Create set
 * 
 * POST
 * /api/sets
 * 
 */
router.post('/', validate(schemas.createSet), async (req, res) => {
    try {
        const set = req.body;

        const newSet = await setService.createSet(set);
        if (!newSet) 
            return res.status(StatusCodes.CONFLICT).json(responseFormat(false, { 
                message: 'Mã set đã tồn tại' 
            }, {})).end();

        return res.status(StatusCodes.CREATED).json(responseFormat(true, {} , {
            set: newSet
        })).end();

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});

/**
 * Get all sets
 * 
 * GET
 * /api/sets?name=&page=&limit=&category_id=&shop=&
 * 
 */
router.get('/', async (req, res) => {

    let page = 1, limit = 10, query = {};

    if (req.query.page) page = req.query.page.toString();
    if (req.query.limit) limit = req.query.limit.toString();
    if (req.query.category_id) query.category = Number.parseInt(req.query.category_id.toString());
    if (req.query.name) query.name = new RegExp(req.query.name, 'i');
    if (req.query.shop) query.shop = Number.parseInt(req.query.shop.toString());

    try {
        const products = await setService.getAllProducts(query, page, limit);
        if (products.docs.length <= 0) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tìm thấy danh sách set.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            products: products.docs,
            pagination: {
                ...products,
                docs: null
            }
        }));

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


/**
 * Get set by id
 * 
 * GET
 * /api/sets/id
 * 
 */
router.get('/:id', async (req, res) => {

    const setId = req.params.id;

    try {
        const set = await setService.getSetById(setId);
        if (!set) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tìm thấy set.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            set
        }));

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


/**
 * Update set
 * 
 * PATCH
 * /api/sets
 * 
 */
router.patch('/', async (req, res) => {
    try {
        const isUpdated = await setService.updateSet(req.body);

        if (!isUpdated) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Sản phẩm ' + req.body.id + ' không tồn tại.' 
            }, {})).end();

        const newSet = await setService.getSetById(req.body.id);
        return res.status(StatusCodes.OK).json(responseFormat(true, {} , { set: newSet }));

    } catch(e) {
        console.log(e);
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
router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const isDeleted = await setService.deleteProduct(productId);

        if (!isDeleted) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Sản phẩm ' + productId + ' không tồn tại.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , { message: "Đã xóa." }));

    } catch(e) {
        console.log(e);
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
 router.delete('/', async (req, res) => {
    const productIds = req.body;
    try {
        const isDeleted = await setService.deleteProducts(productIds);

        if (!isDeleted) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh sách có chứa sản phẩm không tồn tại.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , { message: "Đã xóa." }));

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});

export default router;