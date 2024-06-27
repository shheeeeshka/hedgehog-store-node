import { Router } from "express";

import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js";
import productRouter from "./productRouter.js";
import basketRouter from "./basketRouter.js"
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";

const router = new Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/basket', basketRouter);
router.use('/product', productRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);

export default router;