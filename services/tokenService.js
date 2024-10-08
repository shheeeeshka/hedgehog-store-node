import jwt from "jsonwebtoken";
import Token from "../models/token-model.js";
import ApiError from "../exceptions/ApiError.js";


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
            expiresIn: "60m"
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
            expiresIn: "30d"
        });

        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(userId, refrToken) {
        if (!userId || !refrToken) throw ApiError.BadRequest("Necessary fields not specified");
        const tokenData = await Token.findOne({ userId });
        if (tokenData) {
            tokenData.token = refrToken;
            return tokenData.save();
        }

        const tokenn = new Token({ token: refrToken, userId });
        await tokenn.save();
        return tokenn;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async removeToken(token) {
        const tokenData = await Token.findOneAndDelete({ token });
        return tokenData;
    }

    async findToken(token) {
        const tokenData = await Token.findOne({ token });
        return tokenData;
    }
}

export default new TokenService();