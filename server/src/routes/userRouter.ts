import { Router } from "express";
import userController from "../controllers/userController.js";
import validateMiddleware from "../middlewares/validate.js";
import userSchema from "../validators/userValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const userRouter = Router();

userRouter.post(
    "/register",
    validateMiddleware(userSchema),
    userController.register,
);
userRouter.post("/login", validateMiddleware(userSchema), userController.login);
userRouter.post("/logout", authMiddleware, userController.logout);
userRouter.delete("/:id", authMiddleware, userController.delete);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/all", authMiddleware, userController.getUsers);
export { userRouter };
