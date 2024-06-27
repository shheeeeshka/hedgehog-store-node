import ApiError from "../exceptions/ApiError.js";
import models from "../models/models.js";
import fileService from "./fileService.js";

const { Product, ProductInfo, Type, Brand } = models;

class ProductService {
    async addProduct(name, price, typeId, brandId, imgs, info) {
        const product = await Product.findOne({ where: { name } });
        if (product) {
            throw ApiError.BadRequest(`Product ${name} already exists`);
        }

        const type = await Type.findOne({ where: { id: typeId } });
        if (!type) {
            throw ApiError.BadRequest(`Type ${type.name} doesn't exist`);
        }

        const brand = await Brand.findOne({ where: { id: brandId } });
        if (!brand) {
            throw ApiError.BadRequest(`Brand ${brand.name} doesn't exist`);
        }

        let fileNames = [];

        for (let img of imgs) {
            let fileName = fileService.saveImg(img);
            fileNames.push(fileName);
        }

        const productData = await Product.create({
            name,
            price,
            img: fileNames,
            typeId,
            brandId
        });

        // if (info) {
        //     desc = JSON.parse(info);
        //     desc.forEach(el => {
        //         ProductInfo.create({
        //             title: el.title,
        //             description: el.description,
        //             productId: productData.id,
        //         });
        //     })
        // }

        return productData;
    }

    async getAllProducts(typeId, limit, page) {
        page = page || 1;
        limit = limit || 9;

        let offset = page * limit - limit;
        let products;

        if (!typeId) {
            products = await Product.findAndCountAll({ limit, offset });
        } else if (typeId) {
            products = await Product.findAndCountAll({
                where: { typeId },
                limit,
                offset
            });
        }

        return products;
    }

    async getOneProduct(productId) {
        const product = await Product.findOne({ where: { id: productId } });
        return product;
    }

    async removeOneProduct(productId) {
        const product = await Product.destroy({ where: { id: productId } });
        return product;
    }
}

export default new ProductService();