import type { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";
import userService from "../services/userService.js";
export default async function isAdminMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { user } = req;
    if (!user) {
        throw ApiError.unauthorized("Unauthorized");
    }
    const userRole = await userService.checkUserRole(user?.id);
    if (req.user?.role === "ADMIN" && userRole === "ADMIN") {
        return next();
    }
    throw ApiError.forbidden("Forbidden");
}
