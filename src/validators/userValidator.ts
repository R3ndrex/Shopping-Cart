import z from "zod";
const userSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must contain at least 8 symbols")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
});
export default userSchema;
