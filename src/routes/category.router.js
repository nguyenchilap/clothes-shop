import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import responseFormat from '../shared/responseFormat.js';
import { CATEGORIES,
    getRootCategories,
    getCategoryByIndex,
    getCategoryByName,
    getChildCategoriesByParentIndex,
    getSetCategories } from '../models/enums.js'


//define constant
const router = Router();


/**
 * Get all categories
 * 
 * GET
 * /api/categories?id=?&name=?
 * 
 */
router.get('/', (req, res) => {

    try {
        const categoryId = req.query.id;
        const categoryName = req.query.name;

        if (!CATEGORIES) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh mục rỗng.' 
            }, {})).end();
        }

        if (!categoryId && !categoryName) {
            return res.status(StatusCodes.OK).json(responseFormat(true, {}, { 
                categories: CATEGORIES.map((category, idx) => {
                    category.id = idx;
                    return category;
                }) 
            })).end();
        }

        let category;

        if (categoryId) {
            category = getCategoryByIndex(Number.parseInt(categoryId));
        } else if (categoryName) {
            category = getCategoryByName(categoryName);
        }

        if (!category) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh mục không tồn tại.' 
            }, {})).end();
        }
        return res.status(StatusCodes.OK).json(responseFormat(true, {}, { category })).end();

    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


/**
 * Get all root categories
 * 
 * GET
 * /api/categories/root
 * 
 */
router.get('/root', (req, res) => {

    try {
        const categories = getRootCategories();
        if (!categories || categories.length <= 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh mục rỗng' 
            }, {})).end();
        }
        return res.status(StatusCodes.OK).json(responseFormat(true, {}, { categories })).end();
    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }

});


/**
 * Get child categories
 * 
 * GET
 * /api/categories/child?id=?
 * 
 */
router.get('/child', (req, res) => {

    try {
        const categoryId = req.query.id;

        if (!categoryId) {
            return res.status(StatusCodes.BAD_REQUEST).json(responseFormat(false, { 
                message: 'Cần biết id của danh mục.' 
            }, {})).end();
        }

        const categories = getChildCategoriesByParentIndex(Number.parseInt(categoryId));

        if (!categories || categories.length <= 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Danh mục không có danh mục con.' 
            }, {})).end();
        }

        return res.status(StatusCodes.OK).json(responseFormat(true, {}, { categories })).end();
    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});

/**
 * Get set categories
 * 
 * GET
 * /api/categories/set
 * 
 */
 router.get('/set', (req, res) => {

    try {
        const setCategories = getSetCategories();

        if (!setCategories || setCategories.length <= 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { 
                message: 'Không tồn tại.' 
            }, {})).end();
        }

        return res.status(StatusCodes.OK).json(responseFormat(true, {}, { setCategories })).end();
    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseFormat(false, { message: e }, {})).end()
    }
});


export default router;