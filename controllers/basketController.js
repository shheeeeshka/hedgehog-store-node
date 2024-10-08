import basketService from "../services/basketService.js";

class BasketController {
    async addItemToBasket(req, res, next) {
        try {
            const { userId, productId } = req.body;
            const basketItem = await basketService.addItemToBasket(userId, productId);
            return res.json(basketItem);
        } catch (e) {
            next(e);
        }
    }

    async getBasketItems(req, res, next) {
        try {
            const { userId } = req.params;
            console.log(userId);
            const basketItems = await basketService.getBasketItems(userId);
            return res.json(basketItems);
        } catch (e) {
            next(e);
        }
    }

    async removeItemFromBasket(req, res, next) {
        try {
            const { userId, productId } = req.params;
            const basketItem = await basketService.removeItemFromBasket(userId, productId);
            return res.json(basketItem);
        } catch (e) {
            next(e);
        }
    }
}

export default new BasketController();