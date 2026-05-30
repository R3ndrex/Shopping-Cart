import { Router } from "express";
import colorController from "../controllers/colorController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";

const colorRouter = Router();

colorRouter.post(
    "/",
    authMiddleware,
    isAdminMiddleware,
    colorController.create,
);
colorRouter.delete(
    "/:id",
    authMiddleware,
    isAdminMiddleware,
    colorController.delete,
);
colorRouter.get("/", colorController.getAll);

export { colorRouter };
