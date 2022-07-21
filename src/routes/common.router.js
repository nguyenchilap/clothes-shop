import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import responseFormat from '../shared/responseFormat.js';
import { PRODUCT_UNIT,
    getProductUnitByCode } from '../models/enums.js';
import upload from '../middlewares/multer.js';
import cloudinary from '../shared/cloudinary.js';
import fs from 'fs';

//define constant
const router = Router();


/**
 * Get all product units
 * 
 * GET
 * /api/commons/units/product?name=&code=&
 * 
 */
router.get('/units/product', (req, res) => {

    const productUnitName = req.query.name;
    const productUnitCode = req.query.code;

    if (!PRODUCT_UNIT) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
            message: 'Đơn vị sản phẩm rỗng.' 
        }, {})).end();
    }

    if (!productUnitName && !productUnitCode) {
        return res.status(StatusCodes.OK).json(responseFormat(true, {}, {
            product_units: PRODUCT_UNIT
        })).end();
    }

    let productUnit;

    if (productUnitCode) {
        productUnit = getProductUnitByCode(Number.parseInt(productUnitCode));
    } else if (productUnitName) {
        productUnit = PRODUCT_UNIT[productUnitName];
    }

    if (!productUnit) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
            message: 'Đơn vị sản phẩm không tồn tại.' 
        }, {})).end();
    }
    return res.status(StatusCodes.OK).json(responseFormat(true, {}, { productUnit })).end();

});

/**
 * upload images
 * 
 * POST
 * /api/commons/upload-images
 * 
 */
router.post('/upload-images', upload.array('images'), async (req, res) => {
    try {
        if (!req.files) 
            return res.status(StatusCodes.BAD_REQUEST).json(responseFormat(true, { message: 'Chưa có ảnh.' }, {}));
        const paths = req.files.map(image => image.path);
        return res.status(StatusCodes.CREATED).json(responseFormat(true, {}, paths));
    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


export default router;