import setRepo from '../repos/set.repo.js';
import { CATEGORIES,
    getCategoryByIndex } from '../models/enums.js';

class SetService {

    async createSet(set) {
        const setBySku = await setRepo.findOne({ sku: set.sku, shop: set.shop });
        if (setBySku) return false;
        return await setRepo.create(set);
    }

    async getSetById(setId) {
        let set = await setRepo.findById(setId);
        if (!set.category) return set;
        set.category = getCategoryByIndex(set.category);
        return set;
    }

    async getAllSets(query, page, limit) {
        const sets = await setRepo.find(query, page, limit);
        if (sets.docs.length <= 0) return sets;
        sets.docs.map(set => {
            set.category = getCategoryByIndex(set.category);
            return set;
        });
        return sets;
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