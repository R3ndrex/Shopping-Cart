import ApiError from "../error/ApiError.js";
import type { NextFunction, Request, Response } from "express";
import sizeService from "../services/sizeService.js";

class SizeController {
    async getAll(req: Request, res: Response) {
        const sizes = await sizeService.getAllSizes();
        return res.json({ success: true, data: sizes });
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        if (!name) {
            throw ApiError.badRequest("Name is not defined");
        }
        const createdSize = await sizeService.createSize(name);
        return res.json({ success: true, data: createdSize });
    }
    async delete(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        const { id } = req.params;
        if (!id) {
            throw ApiError.badRequest("Id is not defined");
        }
        const deletedSize = await sizeService.deleteSize(id);
        return res.json({ success: true, data: deletedSize });
    }
}
export default new SizeController();
