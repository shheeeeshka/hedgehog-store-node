import { Router } from "express";

import productController from "../controllers/productController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post("/", checkRole("admin"), productController.addProduct);
router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.delete("/remove/:id", checkRole("admin"), productController.removeOneProduct);

export default router;