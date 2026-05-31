import ApiError from "../error/ApiError.js";
import { prisma } from "../lib/prisma.js";

class SizeService {
    async getAllSizes() {
        const sizes = await prisma.size.findMany();
        if (sizes.length <= 0) {
            throw ApiError.notFound("Sizes not found");
        }
        return sizes.map((size) => ({
            id: size.id,
            name: size.name,
        }));
    }
    async deleteSize(id: string) {
        const deletedSize = await prisma.size.delete({
            where: {
                id,
            },
        });
        return { id: deletedSize.id, name: deletedSize.name };
    }
    async createSize(name: string) {
        const foundSize = await prisma.size.findUnique({
            where: {
                name,
            },
        });
        if (foundSize) {
            throw ApiError.badRequest("Size already exists");
        }
        const createdSize = await prisma.size.create({
            data: {
                name,
            },
        });
        return { id: createdSize.id, name: createdSize.name };
    }
}
export default new SizeService();
