import ApiError from "../exceptions/ApiError.js";
import Brand from "../models/brand-model.js";

class BrandService {
    async addBrand(name) {
        const brand = await Brand.findOne({ name });
        if (brand) {
            throw ApiError.BadRequest(`Brand ${name} already exists`);
        }
        const brandData = new Brand({ name });
        await brandData.save();
        return brandData;
    }

    async getAllBrands() {
        const brands = await Brand.find();
        return brands;
    }

    async getOneBrand(brandId) {
        const brandData = await Brand.findOne({ _id: brandId });
        return brandData;
    }

    async removeOneBrand(brandId) {
        const brandDataDeleteStatus = Brand.findOneAndDelete({ _id: brandId });
        return brandDataDeleteStatus;
    }
}

export default new BrandService();