import ApiError from "../exceptions/ApiError.js";
import Brand from "../models/brand-model.js";
import { Product, ProductInfo } from "../models/product-model.js";
import Type from "../models/type-model.js";
import fileService from "./fileService.js";

class ProductService {
    async addProduct(name, price, typeId, brandId, description, target_gender, sale, detailed_description, possible_sizes, available_sizes, possible_colors, available_colors, target_audience, img, imgs) {
        const p = await Product.findOne({ name });
        if (p) {
            throw ApiError.BadRequest(`Product ${name} already exists`);
        }

        const type = await Type.findOne({ _id: typeId });
        if (!type) {
            throw ApiError.BadRequest(`Type ${typeId} doesn't exist`);
        }

        const brand = await Brand.findOne({ _id: brandId });
        if (!brand) {
            throw ApiError.BadRequest(`Brand ${brandId} doesn't exist`);
        }

        let fileName = fileService.saveImg(img);

        const product = new Product({
            name,
            price,
            img: fileName,
            typeId,
            description,
            brandId,
            target_gender,
            sale,
        });
        await product.save();

        const productInfo = new ProductInfo({
            detailed_description,
            imgs: [], // !!!!!!!
            possible_sizes,
            available_sizes,
            possible_colors,
            available_colors,
            target_audience,
            productId: product?._id,
        });
        await productInfo.save();

        // quantity !!

        // if (info) {
        //     desc = JSON.parse(info);
        //     desc.forEach(el => {
        //         const t = new ProductInfo({
        //             title: el.title,
        //             description: el.description,
        //             productId: productData.id,
        //         });
        //      await t.save();
        //     })
        // }

        return { ...product, ...productInfo };
    }

    async getAllProducts(typeId, limit, page) {
        page = page || 1;
        limit = limit || 9;

        let offset = page * limit - limit;
        let products;

        if (!typeId) {
            products = await Product.findAndCountAll({ limit, offset }); // !!!????
        } else if (typeId) {
            products = await Product.findAndCountAll({ // !!!!?!?????!?!?
                where: { typeId },
                limit,
                offset
            });
        }
        return products;
    }

    async getOneProduct(productId) {
        const product = await Product.findOne({ _id: productId });
        return product;
    }

    async removeOneProduct(productId) {
        const product = await Product.findOneAndDelete({ _id: productId });
        return product;
    }
}

export default new ProductService();