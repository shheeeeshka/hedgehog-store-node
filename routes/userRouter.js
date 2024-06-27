import { Router } from "express";

import userController from "../controllers/userController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.get('/all', checkRole("admin"), userController.getAllUsers);
router.get('/:email', checkRole("admin"), userController.getUserByEmail);

export default router;