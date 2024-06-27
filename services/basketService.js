import models from "../models/models.js";

const { Product, Basket, BasketItem } = models;

class BasketService {
    async addItemToBasket(userId, productId) {
        const basket = await Basket.findOne({ where: { userId } });
        const basketItem = await BasketItem.create({ basketId: basket.id, productId });
        return basketItem;
    }

    async getBasketItems(userId) {
        const basket = await Basket.findOne({ where: { userId } });
        const basketInfo = await BasketItem.findAll({ where: { basketId: basket.id } });
        const productIds = basketInfo.map(item => item.productId);

        const basketItems = await Promise.all(productIds.map(productId => Product.findOne({ where: { id: productId } })));

        return {
            basketItems,
            basketInfo
        };
    }

    async removeItemFromBasket(userId, productId) {
        const basketItem = await BasketItem.destroy({ where: { userId, productId } });
        return basketItem;
    }
}

export default new BasketService();