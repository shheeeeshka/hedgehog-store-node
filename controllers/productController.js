import productService from "../services/productService.js";

class ProductController {
    async addProduct(req, res, next) {
        try {
            const { name, price, typeId, brandId, description, target_gender, sale, detailed_description, possible_sizes, available_sizes, possible_colors, available_colors, target_audience } = req.body;
            const { img, imgs } = req.files; // imgs ??
            const product = await productService.addProduct(name, price, typeId, brandId, description, target_gender, sale, detailed_description, possible_sizes, available_sizes, possible_colors, available_colors, target_audience, img, imgs);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async getAllProducts(req, res, next) {
        try {
            let { typeId, limit, page } = req.query;
            const products = await productService.getAllProducts(typeId, limit, page);
            return res.json(products);
        } catch (e) {
            next(e);
        }
    }

    async getOneProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productService.getOneProduct(id);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async removeOneProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productService.removeOneProduct(id);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();