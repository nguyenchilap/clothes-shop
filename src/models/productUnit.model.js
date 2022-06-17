import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductUnit = new Schema({

    code: String,
    name: String,
    created_by: {type: Schema.Types.ObjectId, ref: 'User'}

}, {
    timestamps: true,
    id: true
});

export default mongoose.model('ProductUnit', ProductUnit);