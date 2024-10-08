import { Router } from "express";

import brandController from "../controllers/brandController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/", checkRole("admin"), brandController.addBrand);
router.get("/all-brands", checkAuth, brandController.getAllBrands);
router.get("/:id", checkAuth, brandController.getOneBrand);
router.delete("/remove/:id", checkRole("admin"), brandController.removeOneBrand);

export default router;