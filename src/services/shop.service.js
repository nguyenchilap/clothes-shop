import shopRepo from '../repos/shop.repo.js';

class ShopService {

    async createShop(shop) {
        return await shopRepo.create(shop);
    }

    async getShopById(shopId) {
        return await shopRepo.findOne({_id: shopId});
    }

    async getAllShops() {
        return await shopRepo.find();
    }

    async updateShop(shop) {
        const currShop = shopRepo.findOne({_id: shop.id});
        if (!currShop) return false;
        return await shopRepo.updateOne({_id: shop.id}, shop);
    }

}

const shopService = new ShopService();

export default shopService;