import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import responseFormat from '../shared/responseFormat.js';
import { validate, schemas } from '../middlewares/validation.js';

import userService from '../services/user.service.js';

//define constant
const userRouter = Router();


/**
 * Create user
 * 
 * POST
 * /api/users
 * 
 */
userRouter.post('/', validate(schemas.createUser), async (req, res) => {

    try {
        const newUser = await userService.createUser(req.body);
        if (!newUser) 
            return res.status(StatusCodes.CONFLICT).json(responseFormat(false, { 
                message: 'Email đã tồn tại' 
            }, {})).end();

        return res.status(StatusCodes.CREATED).json(responseFormat(true, {} , newUser));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

/**
 * Get all users
 * 
 * GET
 * /api/users
 * 
 */
userRouter.get('/', async (req, res) => {

    const type = req.query.type;

    try {
        let users;
        if (type === 'staff') {
            users = await userService.findAllStaff();
        } else if (type === 'buyer') {
            users = await userService.findAllNotStaff();
        } else {
            users = await userService.findAll();
        }
        if (!users) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , users));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

/**
 * Get user info by id
 * 
 * GET
 * /api/users/{id}
 * 
 */
 userRouter.get('/:id', async (req, res) => {

    try {
        const userId = req.params.id;
        const user = await userService.findById(userId);
        if (!user) 
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Người dùng không tồn tại' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , user));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});


export default userRouter;