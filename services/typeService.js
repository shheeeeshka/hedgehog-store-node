import ApiError from "../exceptions/ApiError.js";
import Type from "../models/type-model.js";

class TypeService {
    async addType(name) {
        const type = await Type.findOne({ name });
        if (type) {
            throw ApiError.BadRequest(`Type ${name} already exists`);
        }
        const typeData = new Type({ name });
        await typeData.save();
        return typeData;
    }

    async getAllTypes() {
        const types = await Type.find();
        return types;
    }

    async getOneType(typeId) {
        const typeData = await Type.findOne({ _id: typeId });
        return typeData;
    }

    async removeOneType(typeId) {
        const typeData = Type.findOneAndDelete({ _id: typeId });
        return typeData;
    }
}

export default new TypeService();