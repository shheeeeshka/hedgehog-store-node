import ApiError from "../exceptions/ApiError.js";
import { Basket } from "../models/basket-model.js";
import User from "../models/user-model.js";
import tokenService from "./tokenService.js";

class AccountService {
    async activateAccount(activation_link) {
        const user = await User.findOne({ activation_link });

        if (!user) {
            throw ApiError.BadRequest(`Incorrect activation link`);
        }

        user.activated = true;
        return user.save();
    }

    async deleteAccount(_id, token) {
        if (!token) {
            throw ApiError.Unauthorized();
        }

        const decodedToken = tokenService.validateRefreshToken(token);

        if (_id != decodedToken._id) {
            throw ApiError.Forbidden(`We're sorry, but you don't have permission to delete account ${_id}`);
        }

        await tokenService.removeToken(token);
        const basketDeleteStatus = await Basket.findOneAndDelete({ userId: _id }); // also destroy basket items for specified user _id
        const userDeleteStatus = await User.findOneAndDelete({ _id });
        return basketDeleteStatus && userDeleteStatus;
    }

    async changePassword(email, token, pass, newPass) {
        if (!email || !token) {
            throw ApiError.Unauthorized();
        }

        if (!pass || !newPass) {
            throw ApiError.BadRequest("Password must be specified");
        }

        const isPassEq = pass === newPass;
        if (isPassEq) {
            throw ApiError.BadRequest(`Your new password bust be different from the old one`);
        }

        const decodedToken = tokenService.validateRefreshToken(token);
        if (decodedToken.email !== email) { // admin must be able to delete user ??
            throw ApiError.Forbidden(`We're sorry, but you don't have permission to change password for ${email}`);
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest("User not found!");
        }

        const isPassCorrect = await bcrypt.compare(pass, user.password);
        if (!isPassCorrect) {
            throw ApiError.BadRequest(`Incorrect password`);
        }

        const newHashPass = await bcrypt.hash(newPass, 5);
        user.password = newHashPass;

        return user.save();
    }
}

export default new AccountService();