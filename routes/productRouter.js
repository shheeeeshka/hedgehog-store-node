import { Router } from "express";

import productController from "../controllers/productController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post("/", checkRoleMiddleware("admin"), productController.addProduct);
router.get("/all-products", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.delete("/remove/:id", checkRoleMiddleware("admin"), productController.removeOneProduct);

export default router;