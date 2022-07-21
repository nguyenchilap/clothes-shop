import bcrypt from 'bcrypt';
import userRepo from '../repos/user.repo.js';

class UserService {

    async createUser(user) {
        const isExistedEmail = await this.checkExistedEmail(user);
        if (isExistedEmail) {
            return false;
        }
        const newUser = await userRepo.create(user);
        return newUser;
    }

    async find(query) {
        return await userRepo.find(query);
    }

    async findAll() {
        return await userRepo.find();
    }

    async findAllStaff() {
        return await userRepo.find({ staff: { $exists : true } });
    }

    async findAllNotStaff() {
        return await userRepo.find({ staff: { $exists : false } });
    }

    async findById(id) {
        return await userRepo.findOne({_id: id});
    }

    async checkExistedEmail(user) {
        if (user.email) {
            return await userRepo.findOne({ email: user.email});
        }
        return null;
    }

    async checkCredentials(user) {
        if (!user || !user.email || !user.password) 
            return false;
        const currUser = await userRepo.findOne({ email: user.email });
        if (!currUser || !currUser.password) 
            return false;
        if (!bcrypt.compareSync(user.password, currUser.password)) 
            return false;
        return currUser;
    }

}

const userService = new UserService();

export default userService;