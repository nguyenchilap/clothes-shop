import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import responseFormat from '../shared/responseFormat';
import { CATEGORIES,
    getRootCategories,
    getCategoryByIndex,
    getCategoryByName,
    getChildCategoriesByParentIndex } from '../models/enums.js'


const categoryRouter = Router();

//define route

/**
 * Get all categories
 * 
 * GET
 * /api/categories?id=?&name=?
 * 
 */
categoryRouter.get('/', (req, res) => {

    const categoryId = req.query.id;
    const categoryName = req.query.name;

    if (!CATEGORIES) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
            message: 'Danh mục rỗng' 
        }, {})).end();
    }

    if (!categoryId && !categoryName) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, {}, { 
            categories: CATEGORIES.map((category, idx) => {
                category.id = idx;
                return category;
            }) 
        })).end();
    }

    if (categoryId) {
        const category = getCategoryByIndex(Number.parseInt(categoryId));
        if (!category) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh mục không tồn tại' 
            }, {})).end();
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(responseFormat(false, {}, { category })).end();
    }

    if (categoryName) {
        const category = getCategoryByName(Number.parseInt(categoryId));
        if (!category) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh mục không tồn tại' 
            }, {})).end();
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(responseFormat(false, {}, { category })).end();
    }
    
});


/**
 * Get all root categories
 * 
 * GET
 * /api/categories/root
 * 
 */
categoryRouter.get('/root', (req, res) => {

    const categories = getRootCategories();
    if (!categories || categories.length <= 0) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
            message: 'Danh mục rỗng' 
        }, {})).end();
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, {}, { categories })).end();
});


/**
 * Get child categories
 * 
 * GET
 * /api/categories/child?id=?
 * 
 */
categoryRouter.get('/child', (req, res) => {

    const categoryId = req.query.id;

    if (!categoryId) {
        res.status(StatusCodes.BAD_REQUEST).json(responseFormat(false, { 
            message: 'Cần biết id của danh mục.' 
        }, {})).end();
    }

    const categories = getChildCategoriesByParentIndex(Number.parseInt(categoryId));

    if (!categories || categories.length <= 0) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
            message: 'Danh mục không có danh mục con.' 
        }, {})).end();
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, {}, { categories })).end();
});


export default categoryRouter;