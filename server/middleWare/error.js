const { ERROR } = require('../utils/constants');
const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) =>  {
    console.log(err)
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong mongodb ID Error
    if (err.name === "CastError"){
        const message = `Resource Not Found. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        type: ERROR,
        message: err.message,
    })
}