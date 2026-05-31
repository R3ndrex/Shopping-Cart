import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { indexRouter } from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import ApiError from "./error/ApiError.js";

const FRONTEND_URL = process.env.FRONTEND_URL;
if (!FRONTEND_URL) {
    throw new Error("Frontend url is not defined");
}
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    }),
);

app.use("/api", indexRouter);

app.use((req, res, next) => {
    next(ApiError.notFound("Not found"));
});

app.use(errorHandler);

export default app;
