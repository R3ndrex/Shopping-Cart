import ApiError from "../error/ApiError.js";
import type { NextFunction, Request, Response } from "express";
import colorService from "../services/colorService.js";

class ColorController {
    async getAll(_: Request, res: Response) {
        const colors = await colorService.getAllColors();
        return res.json({ success: true, data: colors });
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        if (!name) {
            return next(ApiError.badRequest("Name is required"));
        }
        const createdColor = await colorService.createColor(name);
        return res.json({ success: true, data: createdColor });
    }
    async delete(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("Id is required"));
        }
        const deletedColor = await colorService.deleteColor(id);
        return res.json({ success: true, data: deletedColor });
    }
}
export default new ColorController();
