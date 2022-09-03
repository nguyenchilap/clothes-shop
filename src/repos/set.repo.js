import Set from '../models/set.model.js'

class SetRepo {

    async create(set) {
        return await Set.create(set);
    }

    async findOne(query) {
        const set = await Set.findOne(query).lean();
        return set;
    }

    async findById(id) {
        const set = await Set.findOne({_id: id}).lean();
        return set;
    }

    async findByIds(ids) {
        const sets = await Set.find({
            _id: { $in: ids }
        }).lean();
        return sets;
    }

    async find(query, page, limit) {
        return await Set.paginate(query, {
            page,
            limit,
            lean: true,
            populate: 'products.product',
            sort: '-createdAt'
        });
    }

    async updateOne(query, newSet) {
        return await Set.updateOne(query, newSet);
    }

    async deleteOne(query) {
        return await Set.deleteOne(query);
    }

    async deleteMany(ids) {
        return await Set.deleteMany({
            _id: {
                $in: ids
            }
        })
    }
}

const setRepo = new SetRepo();

export default setRepo;