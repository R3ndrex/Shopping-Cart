import ApiError from "../error/ApiError.js";
import { prisma } from "../lib/prisma.js";

class ColorService {
    async getAllColors() {
        const colors = await prisma.color.findMany();
        if (colors.length <= 0) {
            throw ApiError.notFound("Colors not found");
        }
        return colors.map((color) => ({
            id: color.id,
            name: color.name,
        }));
    }
    async deleteColor(id: string) {
        const deletedColor = await prisma.color.delete({
            where: {
                id,
            },
        });
        return { id: deletedColor.id, name: deletedColor.name };
    }
    async createColor(name: string) {
        const foundColor = await prisma.color.findUnique({
            where: {
                name,
            },
        });
        if (foundColor) {
            throw ApiError.badRequest("Color already exists");
        }
        const createdColor = await prisma.color.create({
            data: {
                name,
            },
        });
        return { id: createdColor.id, name: createdColor.name };
    }
}
export default new ColorService();
