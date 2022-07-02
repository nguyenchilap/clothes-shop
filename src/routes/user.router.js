import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import responseFormat from '../shared/responseFormat.js';
import { validate, schemas } from '../middlewares/validation.js';

import userService from '../services/user.service.js';


const userRouter = Router();

//define route


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

        return res.status(StatusCodes.OK).json(responseFormat(true, {} , newUser));

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

export default userRouter;