import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const Parameter = new Schema({
    name: String,
    value: Number,
    param_unit: String
}, {
    timestamps: false, id: false
});

const Config = new Schema({
    name: String,
    value: String
}, {
    timestamps: false, id: false
});

const Variant = new Schema({
    sku: String,
    config: [Config],
    stock_quantity: Number,
    stock_available: Boolean
}, {
    timestamps: false, id: false
});

const Product = new Schema({
    sku: String,
    name: String,
    description: String,
    image: String,
    images: [String],
    import_price: Number,
    export_price: Number,
    stock_quantity: Number,
    stock_available: {type: Boolean, default: true},
    special_price: Number,
    promotion_begin_date: Date,
    promotion_end_date: Date,
    product_unit: Number,
    category: Number,
    variants: [Variant],
    parameters: [Parameter],
    created_by: {type: Schema.Types.ObjectId, ref: 'User'},
    site: {type: Schema.Types.ObjectId, ref: 'Site'}
}, {
    timestamps: true,
    id: true
});

//plugin
Product.plugin(paginate);


export default mongoose.model('Product', Product, 'products');