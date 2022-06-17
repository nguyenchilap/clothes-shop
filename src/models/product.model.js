import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const Product = new Schema({

    sku: String,
    name: String,
    description: String,
    image: String,
    images: [String],
    import_price: Number,
    export_price: Number,
    stock_quantity: Number,
    stock_available: Boolean,
    special_price: Number,
    promotion_begin_date: Date,
    promotion_end_date: Date,
    variants: [{
        sku: String,
        config: [{
            name: String,
            value: String
        }],
        stock_quantity: Number,
        stock_available: Boolean
    }],
    parameters: [{
        name: String,
        value: Number,
        unit: String
    }],
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    unit: {type: Schema.Types.ObjectId, ref: 'ProductUnit'},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    site: {type: Schema.Types.ObjectId, ref: 'Site'}

}, {
    timestamps: true,
    id: true
});

//plugin
Product.plugin(paginate);


export default mongoose.model('Product', Product, 'products');