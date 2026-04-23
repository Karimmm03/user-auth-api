const {ZodError} = require('zod');

const errorHandler = (err, req, res, next) => {
    if(err instanceof ZodError){
        return res.status(422).json({
            message: 'Validation failed',
            errors: err.issues.map(e => ({
                field: e.path.join('.'),
                message: e.message
            })),
        });
    }

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Internal server error' : err.message;

    res.status(statusCode).json({
        message,
        errors: []
    });
};

module.exports = {errorHandler};