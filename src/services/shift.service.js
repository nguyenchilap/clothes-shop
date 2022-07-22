import shiftRepo from '../repos/shift.repo.js';

class ShiftService {

    async createShift(shift) {
        const shiftByFromDate = await shiftRepo.findOne({ from_date: shift.from_date });
        if (shiftByFromDate) return false;

        return await shiftRepo.create(shift);
    }

    async getAllShifts(query, page, limit) {
        const shifts = await shiftRepo.find(query, page, limit);
        if (shifts.docs.length <= 0) return shifts;
        return shifts;
    }

    async getShiftById(shiftId) {
        const shift = await shiftRepo.findById(shiftId);
        return shift;
    }

    async updateShift(shift) {
        let currShift = await shiftRepo.findById(shift.id);
        if (!currShift) return false;

        return await shiftRepo.updateOne({_id: shift.id}, shift);
    }

    async deleteShift(shiftId) {
        let shift = await shiftRepo.findById(shiftId);
        if (!shift) return false;

        return await shiftRepo.deleteOne({_id: shiftId});
    }

    async deleteShifts(shiftIds) {
        let shifts = await shiftRepo.findByIds(shiftIds);
        if (shifts.length < shiftIds.length) return false;
        
        return await shiftRepo.deleteMany(shiftIds);
    }

}

const shiftService = new ShiftService();

export default shiftService;