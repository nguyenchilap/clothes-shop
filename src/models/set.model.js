import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const Set = new Schema({
    sku: String,
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'Product'}
    }], 
    name: String, 
    description: String, 
    image: String, 
    images: [String], 
    min_price: Number, 
    max_price: Number,
    special_price: Number, 
    promotion_begin_date: Date,
    promotion_end_date: Date,
    shop: {type: Schema.Types.ObjectId, ref: 'Shop'} 
}, {
    timestamps: true,
    id: true
});

//plugin
Set.plugin(paginate);


export default mongoose.model('Set', Set, 'sets');