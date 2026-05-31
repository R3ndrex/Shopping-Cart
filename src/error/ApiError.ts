class ApiError extends Error {
    public status;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
    static internal(message: string) {
        return new ApiError(message, 500);
    }
    static notFound(message: string) {
        return new ApiError(message, 404);
    }
    static unauthorized(message: string) {
        return new ApiError(message, 401);
    }
    static badRequest(message: string) {
        return new ApiError(message, 400);
    }
    static conflict(message: string) {
        return new ApiError(message, 409);
    }
    static tooManyRequests(message: string) {
        return new ApiError(message, 429);
    }
    static unprocessable(message: string) {
        return new ApiError(message, 422);
    }
    static isApiError(err: unknown): err is ApiError {
        return err instanceof ApiError;
    }
}
export default ApiError;
