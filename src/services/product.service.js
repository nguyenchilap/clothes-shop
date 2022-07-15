import productRepo from '../repos/product.repo.js';
import { CATEGORIES,
    getCategoryByIndex } from '../models/enums.js';

class ProductService {

    async createProduct(product) {
        const productBySku = await productRepo.findOne({ sku: product.sku, site: product.site });
        if (productBySku) return false;

        let stock_quantity = 0;

        product.variants.map(variant => {
            if (!variant.price) variant.price = product.export_price;
            stock_quantity += variant.stock_quantity;
            return variant;
        });

        product.stock_quantity = stock_quantity;

        return await productRepo.create(product);
    }

    async getAllProducts(query, page, limit) {
        const products = await productRepo.find(query, page, limit);
        if (products.docs.length <= 0) return products;
        products.docs.map(product => {
            product.category = getCategoryByIndex(product.category);
            return product;
        });
        return products;
    }

    async getProductById(productId) {
        let product = await productRepo.findById(productId);
        if (!product.category) return product;
        product.category = getCategoryByIndex(product.category);
        return product;
    }

    async updateProduct(product) {
        let currProduct = await productRepo.findById(product.id);
        if (!currProduct) return false;

        return await productRepo.updateOne({_id: product.id}, product);
    }

    async deleteProduct(productId) {
        let product = await productRepo.findById(productId);
        if (!product) return false;

        return await productRepo.deleteOne({_id: productId});
    }

    async deleteProducts(productIds) {
        let products = await productRepo.findByIds(productIds);
        if (products.length < productIds.length) return false;
        
        return await productRepo.deleteMany(productIds);
    }

}

const productService = new ProductService();

export default productService;