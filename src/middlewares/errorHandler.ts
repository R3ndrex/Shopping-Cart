import type { Response, Request, NextFunction } from "express";
import ApiError from "../error/ApiError.js";
export default function ErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.error(err.stack);
    if (ApiError.isApiError(err)) {
        return res
            .status(err.status)
            .json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: "Undefined Error" });
}
