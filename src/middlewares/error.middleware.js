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
    const isProduction = process.env.NODE_ENV === 'production';
    const message = (statusCode === 500 && isProduction) ? 'Internal server error' : err.message;

    res.status(statusCode).json({
        message,
        errors: [],
        ...(isProduction ? {} : { stack: err.stack })
    });
};

module.exports = {errorHandler};