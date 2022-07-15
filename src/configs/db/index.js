import mongoose from 'mongoose';

async function connect(){
    try{
        await mongoose.connect(process.env.DB_HOST, {
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