import { Router } from "express";

import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import accountRouter from "./accountRouter.js";
import productRouter from "./productRouter.js";
import basketRouter from "./basketRouter.js"
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";

const router = new Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/product", productRouter);
router.use("/basket", basketRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);

export default router;