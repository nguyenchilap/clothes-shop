import mongoose from 'mongoose';

const DB = 'mongodb+srv://nclap:Lapboy20@cluster0.gmwsi.mongodb.net/clothes_shop?retryWrites=true&w=majority';

async function connect(){
    try{
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect succesfully!!!');
    }
    catch (error) {
        console.log('Connect failed!!!');
    }
}

export default {connect};