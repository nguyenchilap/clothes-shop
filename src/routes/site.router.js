import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import responseFormat from '../shared/responseFormat.js';

import jwt from 'jsonwebtoken';
import AUTH_CONSTANT from '../configs/auth/index.js';
import { passport } from '../middlewares/auth.js'
import userService from '../services/user.service.js';


//define constant
const encodeToken = (id) => {
    return jwt.sign({
      iss: "apricot",
      sub: id,
    }, AUTH_CONSTANT.JWT_SECRET, {
      expiresIn: '30d'
    })
}

const siteRouter = Router();


/**
 * Log in
 * 
 * POST
 * /api/login
 * 
 */
siteRouter.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {

    try {
        const user = req.user;
        const token = encodeToken(user.id);
        return res.status(StatusCodes.OK).json( responseFormat(true, {}, {
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              phone: user.phone
            }
        }));
    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});

export default siteRouter;