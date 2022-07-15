import Shop from '../models/shop.model.js';

class ShopRepo {

    async create(shop) {
        const newShop = await Shop.create(shop);
        return newShop;
    }

    async findOne(query) {
        const shop = await Shop.findOne(query).lean();
        return shop;
    }

    async find(query) {
        return await Shop.find(query).lean();
    }

    async updateOne(query, newShop) {
        return await Shop.updateOne(query, newShop);
    }

    async deleteOne(query) {
        return await Shop.deleteOne(query);
    }
}

const shopRepo = new ShopRepo();

export default shopRepo;