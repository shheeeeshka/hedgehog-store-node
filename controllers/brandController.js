import brandService from "../services/brandService.js";

class BrandController {
    async addBrand(req, res, next) {
        try {
            const { name } = req.body;
            const brandData = await brandService.addBrand(name);
            return res.json(brandData);
        } catch (e) {
            next(e);
        }
    }

    async getAllBrands(req, res, next) {
        try {
            const brands = await brandService.getAllBrands();
            return res.json(brands);
        } catch (e) {
            next(e);
        }
    }

    async getOneBrand(req, res, next) {
        try {
            const id = req.params.id;
            const brandData = await brandService.getOneBrand(id);
            return res.json(brandData);
        } catch (e) {
            next(e);
        }
    }

    async removeOneBrand(req, res, next) {
        try {
            const id = req.params.id;
            const brandData = await brandService.removeOneBrand(id);
            return res.json(brandData);
        } catch (e) {
            next(e);
        }
    }
}

export default new BrandController();