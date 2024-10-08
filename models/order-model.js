import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    paid: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: String,
    },
    basketItemId: { // in basket / basket item we specify product details such as selected color, quantity
        type: String,
    },
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);

export default Order;