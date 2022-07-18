import { Router } from 'express';
import { jwtAuth } from '../middlewares/auth.js';

import productRouter from './product.router.js';
import siteRouter from './site.router.js';
import categoryRouter from './category.router.js';
import commonRouter from './common.router.js';
import shopRouter from './shop.router.js';
import userRouter from './user.router.js';

const baseRouter = Router();

baseRouter.use('/products', jwtAuth(), productRouter);
baseRouter.use('/categories', jwtAuth(), categoryRouter);
baseRouter.use('/shops', jwtAuth(), shopRouter);
baseRouter.use('/users', jwtAuth(), userRouter);
baseRouter.use('/commons', jwtAuth(), commonRouter);
baseRouter.use('/', siteRouter);

export default baseRouter;