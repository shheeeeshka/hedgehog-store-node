import basketService from "../services/basketService.js";

class BasketController {
    async addItemToBasket(req, res, next) {
        try {
            const { user_id, product_id } = req.body;
            const basketItem = await basketService.addItemToBasket(user_id, product_id);
            return res.json(basketItem);
        } catch (e) {
            next(e);
        }
    }

    async getBasketItems(req, res, next) {
        try {
            const user_id = req.params.id;
            const basketItems = await basketService.getBasketItems(user_id);
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