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
            return res.status(StatusCodes.CONFLICT).json(responseFormat(false, { 
                message: 'Người dùng không tồn tại' 
            }, {})).end();

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , user));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

export default userRouter;