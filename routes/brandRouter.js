import { Router } from "express";

import brandController from "../controllers/brandController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/', checkRoleMiddleware("admin"), brandController.addBrand);
router.get('/all-brands', authMiddleware, brandController.getAllBrands);
router.get('/:id', authMiddleware, brandController.getOneBrand);
router.delete('/remove/:id', checkRoleMiddleware("admin"), brandController.removeOneBrand);

export default router;