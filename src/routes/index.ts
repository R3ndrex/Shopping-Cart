import { Router } from "express";
import { productRouter } from "./productRouter.js";
import { sizeRouter } from "./sizeRouter.js";
import { userRouter } from "./userRouter.js";
import { colorRouter } from "./colorRouter.js";
import { categoryRouter } from "./categoryRouter.js";

const indexRouter = Router();

indexRouter.use("/product", productRouter);
indexRouter.use("/size", sizeRouter);
indexRouter.use("/user", userRouter);
indexRouter.use("/color", colorRouter);
indexRouter.use("/category", categoryRouter);

export { indexRouter };
