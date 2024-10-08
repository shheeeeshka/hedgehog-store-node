import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
}, { timestamps: true });

const basketItemSchema = new mongoose.Schema({
    selected_size: {
        type: String,
    },
    selected_color: {
        type: String,
    },
    productId: {
        type: String,
    },
    basketId: {
        type: String,
    },
}, { timestamps: true });

const Basket = mongoose.model("basket", basketSchema);
const BasketItem = mongoose.model("basket_item", basketItemSchema);

export { Basket, BasketItem };