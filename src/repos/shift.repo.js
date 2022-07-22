import WeeklyShift from '../models/shift.model.js'

class ShiftRepo {

    async create(shift) {
        return await WeeklyShift.create(shift);
    }

    async findOne(query) {
        const shift = await WeeklyShift.findOne(query).populate('days.shifts.staffs').lean();
        return shift;
    }

    async findById(id) {
        const shift = await WeeklyShift.findOne({_id: id}).populate('days.shifts.staffs').lean();
        return shift;
    }

    async findByIds(ids) {
        const shifts = await WeeklyShift.find({
            _id: { $in: ids }
        }).lean();
        return shifts;
    }

    async find(query, page, limit) {
        return await WeeklyShift.paginate(query, {
            page,
            limit,
            lean: true,
            populate: 'days.shifts.staffs',
            sort: '-createdAt'
        });
    }

    async updateOne(query, newShift) {
        return await WeeklyShift.updateOne(query, newShift);
    }

    async deleteOne(query) {
        return await WeeklyShift.deleteOne(query);
    }

    async deleteMany(ids) {
        return await WeeklyShift.deleteMany({
            _id: {
                $in: ids
            }
        })
    }
}

const shiftRepo = new ShiftRepo();

export default shiftRepo;