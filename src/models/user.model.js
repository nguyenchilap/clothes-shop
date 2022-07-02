import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({

    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    sex: String,
    address: String,
    phone: String,
    birth: Date,
    staff: {
        started_date: Date,
        ended_date: Date,
        salary: Number
    },
    avatar: String,
    is_blocked: {type: Boolean, default: false}

}, {
    timestamps: true,
    id: true
});

export default mongoose.model('User', User, 'users');