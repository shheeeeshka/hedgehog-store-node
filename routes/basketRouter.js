import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import basketController from "../controllers/basketController.js";

const router = new Router();

router.post("/", authMiddleware, basketController.addItemToBasket);
router.get("/:id", authMiddleware, basketController.getBasketItems);
router.delete("/remove/:userId/:productId", authMiddleware, basketController.removeItemFromBasket);

export default router;