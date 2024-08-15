import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";

const { Brand } = models;

class BrandService {
    async addBrand(name) {
        const brand = await Brand.findOne({ where: { name } });
        if (brand) {
            throw ApiError.BadRequest(`Brand ${name} already exists`);
        }
        const brandData = await Brand.create({ name });
        return brandData;
    }

    async getAllBrands() {
        const brands = await Brand.findAll();
        return brands;
    }

    async getOneBrand(brandId) {
        const brandData = await Brand.findOne({ where: { id: brandId } });
        return brandData;
    }

    async removeOneBrand(brandId) {
        const brandData = Brand.destroy({ where: { id: brandId } });
        return brandData;
    }
}

export default new BrandService();