import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Shop = new Schema({

    name: String,
    address: String,
    birth_day: Date,
    years_old: Number

}, {
    timestamps: true,
    id: true
}).pre('save', function(next) {
    if (this.birth_day) {
        const now = new Date(Date.now());
        const birthDay = new Date(this.birth_day)
        this.birth_day = birthDay;
        this.years_old = now.getFullYear() - birthDay.getFullYear();
    }
    next();
});

export default mongoose.model('Shop', Shop, 'shops');