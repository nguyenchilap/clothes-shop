import productRepo from '../repos/product.repo.js'

class ProductService {

    async createProduct(product) {
        return await productRepo.create(product);
    }

}

const productService = new ProductService();

export default productService;