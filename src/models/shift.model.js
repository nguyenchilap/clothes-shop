import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const ShiftStaff = new Schema({
    id: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: false, id: false
});

const Shift = new Schema({
    from_hour: Number,
    to_hour: Number,
    staffs: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {
    timestamps: false, id: false
});

const ShiftDay = new Schema({
    day_of_week: String,
    shifts: [Shift]
}, {
    timestamps: false, id: false
})

const WeeklyShift = new Schema({
    from_date: String,
    to_date: String,
    days: [ShiftDay]
}, {
    timestamps: true,
    id: true
}).pre('save', function(next) {
    if (this.from_date) {
        const startDate = new Date(this.from_date);
        const endDate = new Date(startDate.setDate(startDate.getDate() + 6));
        this.to_date = endDate.getFullYear() + '/' + (endDate.getMonth() + 1) + '/' + endDate.getDate();
    }
    next();
});

//plugin
WeeklyShift.plugin(paginate);

export default mongoose.model('WeeklyShift', WeeklyShift, 'weekly_shifts');