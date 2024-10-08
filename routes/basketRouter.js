import { Router } from "express";

import checkAuth from "../middleware/authMiddleware.js";
import checkRole from "../middleware/checkRoleMiddleware.js";
import basketController from "../controllers/basketController.js";

const router = new Router();

router.post("/add-item", checkRole("admin"), basketController.addItemToBasket);
router.get("/:userId", basketController.getBasketItems);
router.delete("/remove/:userId/:productId", checkRole("admin"), basketController.removeItemFromBasket);

export default router;