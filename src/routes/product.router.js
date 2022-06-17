import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import productService from '../services/product.service.js';

const router = Router();


//define route
router.post('/', (req, res) => {
    // const product = await productService.createProduct(req.body);
    res.status(StatusCodes.OK).json(req.body).end();
});

router.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({
        message: req.params.site
    }).end();
});

export default router;