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
});

export default mongoose.model('Shop', Shop, 'shops');