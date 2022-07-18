import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import shopService from '../services/shop.service.js';
import responseFormat from '../shared/responseFormat.js';
import { validate, schemas } from '../middlewares/validation.js';
import { jwtAuth } from '../middlewares/auth.js';

//define constant
const router = Router();

//define route

/**
 * Create shop
 * 
 * POST
 * /api/shops
 * 
 */
router.post('/', jwtAuth(), validate(schemas.createShop), async (req, res) => {

    try {
        const newShop = await shopService.createShop(req.body);
        if (!newShop) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tạo được shop.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            shop: newShop
        })).end();

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

/**
 * Get shops
 * 
 * GET
 * /api/shops
 * 
 */
 router.get('/', async (req, res) => {

    try {
        const shops = await shopService.getAllShops();
        if (!shops || shops.length <= 0) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Chưa có shop nào.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            shops
        })).end();

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

/**
 * Get shops
 * 
 * GET
 * /api/shops/{id}
 * 
 */
 router.get('/:id', async (req, res) => {

    const shopId = req.params.id;

    try {
        const shop = await shopService.getShopById(shopId);
        if (!shop || shop.length <= 0) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tìm thấy shop có id ' + shopId 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            shop
        })).end();

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

/**
 * Update shops
 * 
 * PATCH
 * /api/shops
 * 
 */
 router.patch('/', jwtAuth(), async (req, res) => {

    try {
        const isUpdated = await shopService.updateShop(req.body);
        if (!isUpdated) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tìm thấy shop' 
            }, {})).end();

        const shop = await shopService.getShopById(req.body.id);
        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            shop
        })).end();

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});


export default router;