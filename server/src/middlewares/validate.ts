import type { Request, Response, NextFunction } from "express";
import z from "zod";

export default function validateMiddleware(schema: z.ZodObject<any>) {
    return async function validate(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (e) {
            let error = e;
            if (error instanceof z.ZodError) {
                error = error.issues.map((issue) => {
                    return { path: issue.path, message: issue.message };
                });
            }
            return res.status(400).json({
                success: false,
                message: error,
            });
        }
    };
}
