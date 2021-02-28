const ErrorResponse = require("../utils/errorResponse");

const errorHandleer = (err, req, res, next) => {
    let error = { ...err }
    message   = err.message
    error     = new ErrorResponse(message, 400)

    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
    res.render('error');
}

module.exports = errorHandleer;