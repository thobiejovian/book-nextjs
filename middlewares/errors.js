import ErrorHandler from "../utils/errorHandler";

export default(err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    let error = {...err}
    error.message = err.message;

    // Wrong Object ID Error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    // Handling Validation error
    if(err.name === "ValidationError") {
        const message = Object.values(err.errors).map(value => value.message)
        error = new ErrorHandler(message, 404);
    }
    res.status(err.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack: error.stack
    })
}