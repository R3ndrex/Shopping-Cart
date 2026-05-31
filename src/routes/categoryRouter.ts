import { Router } from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";
const categoryRouter = Router();

categoryRouter.post(
    "/",
    authMiddleware,
    isAdminMiddleware,
    categoryController.create,
);
categoryRouter.delete(
    "/:id",
    authMiddleware,
    isAdminMiddleware,
    categoryController.delete,
);
categoryRouter.get("/", categoryController.getAll);

export { categoryRouter };
