import { Basket, BasketItem } from "../models/basket-model.js";
import { Product } from "../models/product-model.js";


class BasketService {
    async addItemToBasket(userId, productId) { // !!
        const basket = await Basket.findOne({ userId });
        const basketItem = new BasketItem({ basketId: basket._id, productId }); // !!!!!??????
        await basketItem.save();
        return basketItem;
    }

    async getBasketItems(userId) { // !!
        const basket = await Basket.findOne({ userId });
        const basketInfo = await BasketItem.find({ basketId: basket._id });
        const productIds = basketInfo.map(item => item.productId); // !!!!??????

        const basketItems = await Promise.all(productIds.map(productId => Product.findOne({ _id: productId }))); // !!!!!!??????

        return {
            basketItems,
            basketInfo,
        };
    }

    async removeItemFromBasket(userId, productId) {
        const basketItemDeleteStatus = await BasketItem.findOneAndDelete({ userId, productId });
        return basketItemDeleteStatus;
    }
}

export default new BasketService();