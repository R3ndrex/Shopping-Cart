import { Router } from "express";
import sizeController from "../controllers/sizeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";

const sizeRouter = Router();

sizeRouter.post("/", authMiddleware, isAdminMiddleware, sizeController.create);
sizeRouter.delete(
    "/:id",
    authMiddleware,
    isAdminMiddleware,
    sizeController.delete,
);
sizeRouter.get("/", sizeController.getAll);

export { sizeRouter };
