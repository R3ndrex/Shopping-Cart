import ApiError from "../error/ApiError.js";
import type { Request, Response } from "express";
import productService from "../services/productService.js";

const UUIDLENGTH = 36;

class ProductController {
    async get(req: Request, res: Response) {
        const { idSlug } = req.params;
        const id = String(idSlug)?.slice(0, UUIDLENGTH);
        const slug = String(idSlug)?.slice(UUIDLENGTH + 1);
        if (!id || !slug) {
            throw ApiError.notFound("Id or slug in not defined");
        }
        const product = await productService.getProduct(id, slug);
        return res.json({
            success: true,
            data: product,
        });
    }
    async create(req: Request, res: Response) {
        const { name, slug, variants, categoryId, productInfo } = req.body;
        if (
            !name ||
            !slug ||
            variants?.length <= 0 ||
            !categoryId ||
            productInfo?.length <= 0
        ) {
            throw ApiError.badRequest(
                "Name and slug and variants and category and product info must be specified",
            );
        }
        const createdProduct = await productService.createProduct({
            name,
            slug,
            variants,
            categoryId,
            productInfo,
        });
        return res.json({ success: true, data: createdProduct });
    }
    async getAll(
        req: Request<
            { page: string },
            any,
            any,
            { orderValue?: "name" | "popularity"; orderBy?: "desc" | "asc" }
        >,
        res: Response,
    ) {
        const { orderValue, orderBy } = req.query;
        const { page } = req.params;
        const items_per_page = 10;
        const products = await productService.getAllProducts(
            Number(page),
            items_per_page,
            orderValue,
            orderBy,
        );

        return res.json({ success: true, ...products });
    }
    async delete(req: Request, res: Response) {
        const { idSlug } = req.params;
        const id = String(idSlug)?.slice(0, UUIDLENGTH);
        const slug = String(idSlug)?.slice(UUIDLENGTH + 1);
        if (!id || !slug) {
            throw ApiError.notFound("Id or slug in not defined");
        }
        const deletedProduct = await productService.deleteProduct(id, slug);
        return res.json({ success: true, data: deletedProduct });
    }
}
export default new ProductController();
