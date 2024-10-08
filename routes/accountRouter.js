import { Router } from "express";

import accountController from "../controllers/accountController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/password/change", checkAuth, accountController.changePassword);
router.get("/activate/:link", accountController.activateAccount);
router.delete("/delete/:id", checkAuth, accountController.deleteAccount);

export default router;