import productRepo from '../repos/product.repo.js'

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

    async getProductById(productId) {
        return await productRepo.findOne({
            _id: productId
        })
    }

}

const productService = new ProductService();

export default productService;