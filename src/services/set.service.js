import setRepo from '../repos/set.repo.js';

class SetService {

    async createSet(set) {
        const setBySku = await setRepo.findOne({ sku: set.sku, shop: set.shop });
        if (setBySku) return false;
        return await setRepo.create(set);
    }

    async getSetById(setId) {
        return await setRepo.findOne({_id: setId});
    }

    async getAllSets() {
        return await setRepo.find();
    }

    async updateSet(set) {
        const currset = setRepo.findOne({_id: set.id});
        if (!currset) return false;
        return await setRepo.updateOne({_id: set.id}, set);
    }

    async deleteSet(setId) {
        let set = await setRepo.findById(setId);
        if (!set) return false;

        return await setRepo.deleteOne({_id: setId});
    }

    async deleteSets(setIds) {
        let sets = await setRepo.findByIds(setIds);
        if (sets.length < setIds.length) return false;
        
        return await setRepo.deleteMany(setIds);
    }

}

const setService = new SetService();

export default setService;