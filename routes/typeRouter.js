import { Router } from "express";

import typeController from "../controllers/typeController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/", checkRole("admin"), typeController.addType);
router.get("/all-types", checkAuth, typeController.getAllTypes);
router.get("/:id", checkAuth, typeController.getOneType);
router.delete("/remove/:id", checkRole("admin"), typeController.removeOneType);

export default router;