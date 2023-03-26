import { Router } from 'express';
import { jwtAuth } from '../middlewares/auth.js';

import productRouter from './product.router.js';
import shiftRouter from './shift.router.js';
import categoryRouter from './category.router.js';
import commonRouter from './common.router.js';
import shopRouter from './shop.router.js';
import userRouter from './user.router.js';
import siteRouter from './site.router.js';
import setRouter from './set.router.js';

const baseRouter = Router();

baseRouter.use('/sets', setRouter);
baseRouter.use('/products', productRouter);
baseRouter.use('/shifts', shiftRouter);
baseRouter.use('/categories', categoryRouter);
baseRouter.use('/shops', shopRouter);
baseRouter.use('/users', userRouter);
baseRouter.use('/commons', commonRouter);
baseRouter.use('/', siteRouter);

export default baseRouter;