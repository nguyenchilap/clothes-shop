import { Router } from 'express';

import productRouter from './product.router.js';
import siteRouter from './site.router.js';
import categoryRouter from './category.router.js';
import commonRouter from './common.router.js';

const baseRouter = Router();

baseRouter.use('/products', productRouter);
baseRouter.use('/categories', categoryRouter);
baseRouter.use('/commons', commonRouter);
baseRouter.use('/', siteRouter);

export default baseRouter;