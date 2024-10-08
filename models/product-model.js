import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    target_gender: {
        type: String, // specify allowed fields m - men / w - woman / u - unisex ??
        default: "u",
    },
    img: {
        type: String,
    },
    description: {
        type: String, // display product description (catalog)
    },
    sale: {
        type: String,
    },
    brandId: {
        type: String,
    },
    typeId: {
        type: String,
    },
}, { timestamps: true });

const productInfoSchema = new mongoose.Schema({
    detailed_description: {
        type: String, // display detailed product description (product card)
    },
    imgs: {
        type: [String], // product images
        default: [],
    },
    possible_sizes: {
        type: [String], // all posible sizes for a specific product
    },
    available_sizes: {
        type: [String], // all available sizes for a specific product (mb some is out of stock)
    },
    possible_colors: {
        type: [String], // all posible colors for a specific product
    },
    available_colors: {
        type: [String], // all available colors for a specific product (mb some is out of stock)
    },
    target_audience: {
        type: String, // adults / kids ??
    },
    productId: {
        type: String,
    },
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);
const ProductInfo = mongoose.model("product_info", productInfoSchema);

export { Product, ProductInfo };