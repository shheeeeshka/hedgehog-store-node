import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";

const { Type } = models;

class TypeService {
    async addType(name) {
        const type = await Type.findOne({ where: { name } });
        if (type) {
            throw ApiError.BadRequest(`Type ${name} already exists`);
        }
        const typeData = await Type.create({ name });
        return typeData;
    }

    async getAllTypes() {
        const types = await Type.findAll();
        return types;
    }

    async getOneType(typeId) {
        const typeData = await Type.findOne({ where: { id: typeId } });
        return typeData;
    }

    async removeOneType(typeId) {
        const typeData = Type.destroy({ where: { id: typeId } });
        return typeData;
    }
}

export default new TypeService();