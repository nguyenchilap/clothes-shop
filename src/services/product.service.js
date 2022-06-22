import productRepo from '../repos/product.repo.js'

class ProductService {

    async createProduct(product) {
        const productBySku = await productRepo.findOne({ sku: product.sku, site: product.site });
        if (productBySku) return false;
        return await productRepo.create(product);
    }

    async getProductById(productId) {
        return await productRepo.findOne({
            _id: productId
        })
    }

}

const productService = new ProductService();

export default productService;