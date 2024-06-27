import * as uuid from "uuid";
import bcrypt from "bcrypt";

import models from "../models/models.js";
import ApiError from "../exceptions/ApiError.js";
import mailService from "./mailService.js";
import UserDto from "../dtos/userDto.js";
import tokenService from "./tokenService.js";

const { User, UserInfo, Basket } = models;

class AuthService {
    async registration(email, password) {
        const candidate = await User.findOne({ where: { email } });

        if (candidate) {
            throw ApiError.BadRequest(`User ${email} already exists`);
        }

        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            email,
            password: hashPassword,
            activationLink,
        });

        const userInfo = await UserInfo.create({
            registrated: Date.now(),
            userId: user.id,
        });

        await Basket.create({ userId: user.id });

        // await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activation/${activationLink}`);

        const userDto = new UserDto({ ...user.dataValues, ...userInfo.dataValues });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        }
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.BadRequest(`User ${email} not found`)
        }
        const userInfo = await UserInfo.findOne({ where: { userId: user.id } });
        const isPassEq = await bcrypt.compare(password, user.password);
        if (!isPassEq) {
            throw ApiError.BadRequest(`Incorrect password`)
        }

        const userDto = new UserDto({ ...user.dataValues, ...userInfo.dataValues });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
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

        const user = await User.findOne({ where: { id: userData.id } });
        const userInfo = await UserInfo.findOne({ where: { userId: userData.id } });
        const userDto = new UserDto({ ...user.dataValues, ...userInfo.dataValues });
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new AuthService();