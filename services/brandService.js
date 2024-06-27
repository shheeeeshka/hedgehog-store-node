import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";

const { Brand } = models;

class BrandService {
    async addBrand(name) {
        const type = await Brand.findOne({ where: { name } });
        if (type) {
            throw ApiError.BadRequest(`Brand ${name} already exists`);
        }
        const brandData = await Brand.create({ name });
        return brandData;
    }

    async getAllBrands() {
        const brands = await Brand.findAll();
        return brands;
    }

    async getOneBrand(brand_id) {
        const brandData = await Type.findOne({ where: { id: brand_id } });
        return brandData;
    }

    async removeOneBrand(brand_id) {
        const brandData = Type.destroy({ where: { id: brand_id } });
        return brandData;
    }
}

export default new BrandService();