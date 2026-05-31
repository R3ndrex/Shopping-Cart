import type { Request, Response } from "express";
import userService from "../services/userService.js";

const refreshCookieOptions = {
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
};

class userController {
    async register(req: Request, res: Response) {
        const { email, password } = req.body;
        await userService.revokeRefreshToken(req.cookies.refreshToken);
        const user = await userService.register(email, password);
        res.clearCookie("refreshToken", refreshCookieOptions);
        res.cookie("refreshToken", user.refreshToken, refreshCookieOptions);
        return res.json({
            success: true,
            data: {
                id: user.id,
                role: user.role,
                email: user.email,
                accessToken: user.accessToken,
            },
        });
    }
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        await userService.revokeRefreshToken(req.cookies.refreshToken);
        const user = await userService.login(email, password);
        res.clearCookie("refreshToken", refreshCookieOptions);
        res.cookie("refreshToken", user.refreshToken, refreshCookieOptions);
        return res.json({
            success: true,
            data: {
                id: user.id,
                role: user.role,
                email: user.email,
                accessToken: user.accessToken,
            },
        });
    }
    async delete(req: Request, res: Response) {
        //     const { refreshToken } = req.cookies;
        //     res.clearCookie("refreshToken");
        //     await userService.logout(refreshToken);
        //     res.json({ success: true, data: {} });
    }
    async logout(req: Request, res: Response) {
        const { refreshToken } = req.cookies;
        await userService.logout(refreshToken);
        res.clearCookie("refreshToken", refreshCookieOptions);
        res.json({ success: true });
    }
    async refresh(req: Request, res: Response) {
        const { refreshToken } = req.cookies;
        const user = await userService.refresh(refreshToken);
        res.clearCookie("refreshToken", refreshCookieOptions);
        res.cookie("refreshToken", user.refreshToken, refreshCookieOptions);
        res.json({
            success: true,
            data: {
                id: user.id,
                role: user.role,
                email: user.email,
                accessToken: user.accessToken,
            },
        });
    }
    async getUsers(req: Request, res: Response) {
        const users = await userService.getUsers();
        return res.json({ success: true, data: users });
    }
}
export default new userController();
