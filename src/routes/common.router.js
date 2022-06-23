import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import responseFormat from '../shared/responseFormat.js';
import { PRODUCT_UNIT,
    getProductUnitByCode } from '../models/enums.js'


const commonRouter = Router();

//define route

/**
 * Get all product units
 * 
 * GET
 * /api/commons/units/product?name=&code=&
 * 
 */
commonRouter.get('/units/product', (req, res) => {

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


export default commonRouter;