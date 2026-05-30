import type { JwtPayload } from "jsonwebtoken";
import type { Prisma } from "../generated/prisma/client.js";

class UserDto {
    public role: "ADMIN" | "USER";
    public id: string;
    constructor(user: Prisma.UserModel) {
        this.role = user.role;
        this.id = user.id;
    }
}
export default UserDto;
export type UserDtoType = JwtPayload & {
    role: string;
    id: string;
};
