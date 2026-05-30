import { Router } from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js";

const productRouter = Router();

productRouter.post(
    "/",
    authMiddleware,
    isAdminMiddleware,
    productController.create,
);
productRouter.delete(
    "/:idSlug",
    authMiddleware,
    isAdminMiddleware,
    productController.delete,
);
productRouter.get("/:page", productController.getAll);
productRouter.get("/:idSlug", productController.get);

export { productRouter };
