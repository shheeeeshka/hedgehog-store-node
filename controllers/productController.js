import productService from "../services/productService.js";

class ProductController {
    async addProduct(req, res, next) {
        try {
            const { name, price, typeId, brandId, info } = req.body;
            const { imgs } = req.files;
            const product = await productService.addProduct(name, price, typeId, brandId, imgs, info);
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
            const id = req.params.id;
            const product = await productService.getOneProduct(id);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }

    async removeOneProduct(req, res, next) {
        try {
            const id = req.params.id;
            const product = await productService.removeOneProduct(id);
            return res.json(product);
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();