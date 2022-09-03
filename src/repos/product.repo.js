import Product from '../models/product.model.js'

class ProductRepo {

    async create(product) {
        return await Product.create(product);
    }

    async findOne(query) {
        const product = await Product.findOne(query).lean();
        return product;
    }

    async findById(id) {
        const product = await Product.findOne({_id: id}).lean();
        return product;
    }

    async findByIds(ids) {
        const products = await Product.find({
            _id: { $in: ids }
        }).lean();
        return products;
    }

    async find(query, page, limit) {
        return await Product.paginate(query, {
            page,
            limit,
            lean: true,
            sort: '-createdAt'
        });
    }

    async updateOne(query, newProduct) {
        return await Product.updateOne(query, newProduct);
    }

    async deleteOne(query) {
        return await Product.deleteOne(query);
    }

    async deleteMany(ids) {
        return await Product.deleteMany({
            _id: {
                $in: ids
            }
        })
    }
}

const productRepo = new ProductRepo();

export default productRepo;