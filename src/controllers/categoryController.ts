import type { NextFunction, Request, Response } from "express";
import categoryService from "../services/categoryService.js";
import ApiError from "../error/ApiError.js";

class CategoryController {
    async getAll(req: Request, res: Response) {
        const categories = await categoryService.getAllCategories();
        return res.json({ success: true, data: categories });
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        if (!name) {
            throw ApiError.badRequest("Name is not defined");
        }
        const createdCategory = await categoryService.createCategory(name);
        return res.json({ success: true, data: createdCategory });
    }
    async delete(
        req: Request<{ id: string }>,
        res: Response,
        next: NextFunction,
    ) {
        let { id } = req.params;
        if (!id) {
            throw ApiError.badRequest("Id is required");
        }
        const deletedCategory = await categoryService.deleteCategory(id);
        return res.json({ success: true, data: deletedCategory });
    }
}
export default new CategoryController();
