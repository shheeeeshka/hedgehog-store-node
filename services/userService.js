import models from "../models/models.js";

const { User } = models;

class UserService {
    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }

    async getUserByEmail(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    }
}

export default new UserService();