import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const SALT_OR_ROUNDS = 10;

class UserRepo {

    async create(user) {
        const hashedPassword = bcrypt.hashSync(user.password, SALT_OR_ROUNDS);
        const newUser = await User.create({
            ...user,
            password: hashedPassword
        });
        return newUser;
    }

    async findOne(query) {
        const user = await User.findOne(query).lean();
        return user;
    }

    async find(query) {
        return await User.find(query).lean();
    }

    async updateOne(query, newUser) {
        return await User.updateOne(query, newUser);
    }

    async deleteOne(query) {
        return await User.deleteOne(query);
    }

    async deleteMany(ids) {
        return await User.deleteMany({
            _id: {
                $in: ids
            }
        })
    }
}

const userRepo = new UserRepo();

export default userRepo;