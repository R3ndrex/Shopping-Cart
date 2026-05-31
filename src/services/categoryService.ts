import ApiError from "../error/ApiError.js";
import { prisma } from "../lib/prisma.js";

class CategoryService {
    async getAllCategories() {
        const categories = await prisma.category.findMany();
        if (categories.length <= 0) {
            throw ApiError.notFound("Categories not found");
        }
        return categories.map((category) => ({
            id: category.id,
            name: category.name,
        }));
    }

    async deleteCategory(id: string) {
        const deletedCategory = await prisma.category.delete({
            where: { id: id },
        });
        return { id: deletedCategory.id, name: deletedCategory.name };
    }
    async createCategory(name: string) {
        const foundCategory = await prisma.category.findFirst({
            where: {
                name: name,
            },
        });
        if (foundCategory) {
            throw ApiError.badRequest("Category already exists");
        }

        const createdCategory = await prisma.category.create({
            data: {
                name,
            },
        });
        return { id: createdCategory.id, name: createdCategory.name };
    }
}
export default new CategoryService();
