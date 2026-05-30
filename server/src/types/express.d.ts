import type { JwtPayload } from "jsonwebtoken";
import type { UserDtoType } from "../dtos/userDto.js";

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; role: string };
        }
    }
}

export {};
