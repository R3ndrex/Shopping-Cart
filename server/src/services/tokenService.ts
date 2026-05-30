import jwt from "jsonwebtoken";
import "dotenv/config";
import { prisma } from "../lib/prisma.js";
import type { UserDtoType } from "../dtos/userDto.js";
class TokenService {
    async generateTokens(payload: UserDtoType) {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error("JWT tokens are not defined");
        }
        const tokenPayload = {
            id: payload.id,
            role: payload.role,
        };

        const accessToken = jwt.sign(
            tokenPayload,
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: "15min",
            },
        );
        const refreshToken = jwt.sign(
            tokenPayload,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "14d",
            },
        );
        return { accessToken, refreshToken };
    }

    validateAccessToken(token: string) {
        try {
            if (!process.env.JWT_ACCESS_SECRET) {
                throw new Error("Access token isn't defined");
            }
            const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return payload;
        } catch (e) {
            return null;
        }
    }
    validateRefreshToken(token: string) {
        try {
            if (!process.env.JWT_REFRESH_SECRET) {
                throw new Error("Refresh token isn't defined");
            }
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }
    async findRefreshToken(token: string) {
        return await prisma.token.findFirst({
            where: {
                refreshToken: token,
            },
        });
    }
    async removeRefreshToken(token: string) {
        return await prisma.token.delete({
            where: {
                refreshToken: token,
            },
        });
    }
    async saveToken(userId: string, refreshToken: string) {
        return await prisma.token.create({
            data: {
                userId,
                refreshToken,
            },
        });
    }
}
export default new TokenService();
