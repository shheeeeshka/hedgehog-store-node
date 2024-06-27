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

    async getOneType(type_id) {
        const typeData = await Type.findOne({ where: { id: type_id } });
        return typeData;
    }

    async removeOneType(type_id) {
        const typeData = Type.destroy({ where: { id: type_id } });
        return typeData;
    }
}

export default new TypeService();