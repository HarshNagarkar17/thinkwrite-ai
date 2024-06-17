class AppError extends Error{
    constructor(message,statusCode, isOperational = true){
        super(message)
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor)
    }
}

class BadRequest extends AppError{
    constructor(message,statusCode=400){
        super(message,statusCode)
    }
}

class NotFoundError extends AppError{
    constructor(message = "Not found",statusCode = 404){
        super(message)
    }
}
export {AppError,BadRequest,NotFoundError}