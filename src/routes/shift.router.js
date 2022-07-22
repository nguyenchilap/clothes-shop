import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import shiftService from '../services/shift.service.js';
import responseFormat from '../shared/responseFormat.js';
import { validate, schemas } from '../middlewares/validation.js';

//define constant
const router = Router();

/**
 * Create shift
 * 
 * POST
 * /api/shifts
 * 
 */
router.post('/', validate(schemas.createShift), async (req, res) => {

    try {
        const shift = await shiftService.createShift(req.body);
        if (!shift) 
            return res.status(StatusCodes.CONFLICT).json(responseFormat(false, { 
                message: 'Ca đã tồn tại.' 
            }, {})).end();

        return res.status(StatusCodes.CREATED).json(responseFormat(true, {} , {
            weekly_shift: shift
        })).end();

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

/**
 * Get all shifts
 * 
 * GET
 * /api/shifts?name=&page=&limit=&
 * 
 */
router.get('/', async (req, res) => {

    let page = 1, limit = 10, query = {};

    if (req.query.page) page = req.query.page.toString();
    if (req.query.limit) limit = req.query.limit.toString();

    try {
        const shifts = await shiftService.getAllShifts(query, page, limit);
        if (shifts.docs.length <= 0) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tìm thấy danh sách ca' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            weekly_shifts: shifts.docs,
            pagination: {
                ...shifts,
                docs: null
            }
        }));

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


/**
 * Get shift by id
 * 
 * GET
 * /api/shifts/{id}
 * 
 */
router.get('/:id', async (req, res) => {

    const shiftId = req.params.id;

    try {
        const shift = await shiftService.getProductById(shiftId);
        if (!shift) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tìm thấy sản phẩm yêu cầu.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , {
            weekly_shift: product
        }));

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


/**
 * Update weekly_shift
 * 
 * PATCH
 * /api/shifts
 * 
 */
router.patch('/', async (req, res) => {
    try {
        const isUpdated = await shiftService.updateShift(req.body);

        if (!isUpdated) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Ca ' + req.body.id + ' không tồn tại.' 
            }, {})).end();

        const newShift = await shiftService.getShiftById(req.body.id);
        return res.status(StatusCodes.OK).json(responseFormat(true, {} , { weekly_shift: newShift }));

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


/**
 * Delete one product
 * 
 * DELETE
 * /api/shifts/{id}
 * 
 */
router.delete('/:id', async (req, res) => {
    const shiftId = req.params.id;
    try {
        const isDeleted = await shiftService.deleteProduct(shiftId);

        if (!isDeleted) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Ca ' + shiftId + ' không tồn tại.' 
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
 * /api/shifts
 * 
 */
 router.delete('/', async (req, res) => {
    const shiftIds = req.body;
    try {
        const isDeleted = await shiftService.deleteProducts(shiftIds);

        if (!isDeleted) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh sách có chứa ca không tồn tại.' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , { message: "Đã xóa." }));

    } catch(e) {
        console.log(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});

export default router;