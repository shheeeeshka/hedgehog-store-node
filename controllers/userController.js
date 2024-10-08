import userService from "../services/userService.js";

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUserByEmail(req, res, next) {
        try {
            const { email } = req.params;
            const user = await userService.getUserByEmail(email);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();