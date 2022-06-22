import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Site = new Schema({

    name: String,
    address: String,
    birth_day: Date,
    years_old: Number

}, {
    timestamps: true,
    id: true
});

export default mongoose.model('Site', Site, 'sites');