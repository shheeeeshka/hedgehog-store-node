import * as uuid from "uuid";
import bcrypt from "bcrypt";

import ApiError from "../exceptions/ApiError.js";
import mailService from "./mailService.js";
import UserDto from "../dtos/userDto.js";
import tokenService from "./tokenService.js";
import User from "../models/user-model.js";
import { Basket } from "../models/basket-model.js";

class AuthService {
    async registration(email, password) {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(`User ${email} already exists`);
        }

        const activation_link = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 5); //

        const user = new User({
            email,
            password: hashPassword,
            activation_link,
        });

        await user.save();
        const newBasket = new Basket({ userId: user?._id });
        await newBasket.save();
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activation/${activationLink}`);

        const userDto = new UserDto({ ...user });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`Email or password is incorrect`)
        }
        const isPassEq = await bcrypt.compare(password, user?.password);
        if (!isPassEq) {
            throw ApiError.BadRequest(`Email or password is incorrect`)
        }

        const userDto = new UserDto({ ...user });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized();
        }
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        const userTokenFromDB = await tokenService.findToken(refreshToken);

        if (!userData || !userTokenFromDB) {
            throw ApiError.Unauthorized();
        }

        const user = await User.findOne({ _id: userData._id });
        const userDto = new UserDto({ ...user });
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }
}

export default new AuthService();