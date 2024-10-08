import User from "../models/user-model.js";

class UserService {
    async getAllUsers() {
        const users = await User.find();
        return users;
    }

    async getUserByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }
}

export default new UserService();