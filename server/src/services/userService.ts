import ApiError from "../error/ApiError.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/userDto.js";
class UserService {
    async register(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user !== null) {
            throw ApiError.conflict("User already exists");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const createdUser = await prisma.user.create({
            data: {
                email,
                password: passwordHash,
            },
        });
        const userDto = new UserDto(createdUser);
        const { accessToken, refreshToken } =
            await tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, refreshToken);

        return {
            id: createdUser.id,
            email: createdUser.email,
            role: createdUser.role,
            accessToken,
            refreshToken,
        };
    }
    async revokeRefreshToken(refreshToken?: string) {
        if (!refreshToken) {
            return;
        }
        await tokenService.removeRefreshToken(refreshToken);
    }
    async checkUserRole(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw ApiError.badRequest("User doesn't exist");
        }
        return user.role;
    }
    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw ApiError.badRequest("User doesn't exist");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw ApiError.badRequest("Password don't match");
        }
        const userDto = new UserDto(user);
        const { accessToken, refreshToken } =
            await tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, refreshToken);
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken,
        };
    }
    async logout(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.unauthorized("Refresh token not found");
        }
        await tokenService.removeRefreshToken(refreshToken);
    }
    async refresh(oldRefreshToken: string) {
        if (!oldRefreshToken) {
            throw ApiError.unauthorized("Refresh token not found");
        }
        const userData = tokenService.validateRefreshToken(oldRefreshToken) as {
            id: string;
            role: string;
        };
        const refreshInDB =
            await tokenService.findRefreshToken(oldRefreshToken);
        if (!refreshInDB || !userData) {
            throw ApiError.unauthorized("Unauthorized access");
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userData.id,
            },
        });
        if (!user) {
            throw ApiError.unauthorized("User not found");
        }
        await tokenService.removeRefreshToken(oldRefreshToken);
        const userDto = new UserDto(user);
        const { accessToken, refreshToken } =
            await tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, refreshToken);
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken,
        };
    }
    async getUsers() {
        return await prisma.user.findMany({});
    }
}
export default new UserService();
