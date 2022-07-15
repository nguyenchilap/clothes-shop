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

export default router;