import { Router } from "express";

import typeController from "../controllers/typeController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/', checkRoleMiddleware("admin"), typeController.addType);
router.get('/all-types', authMiddleware, typeController.getAllTypes);
router.get('/:id', authMiddleware, typeController.getOneType);
router.delete('/remove/:id', checkRoleMiddleware("admin"), typeController.removeOneType);

export default router;