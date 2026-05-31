import type { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";
import tokenService from "../services/tokenService.js";

export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw ApiError.unauthorized("Unauthorized Access");
        }
        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            throw ApiError.unauthorized("Unauthorized Access");
        }
        const payload = tokenService.validateAccessToken(accessToken) as {
            id: string;
            role: string;
        };
        if (!payload) {
            throw ApiError.unauthorized("Unauthorized Access");
        }
        req.user = payload;
        next();
    } catch (e) {
        throw ApiError.unauthorized("Unauthorized Access");
    }
}
