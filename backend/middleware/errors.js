const ErrorHandler = require("../utils/ErrorHandler");

// 500 means internal server error
module.exports = function(err, req, res, next){
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';
    if(process.env.NODE_ENV==='DEVELOPMENT ')
    {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            stack: err.stack,
            mode: process.env.NODE_ENV
        });
    }
    if(process.env.NODE_ENV==='PRODUCTION ') {
        // Wrong Mongoose object ID Error (for example if we write a wrong id)
        error = err;
        if(err.name =='CastError'){
            const message = `Resource not found. Invalid  ${err.path}`
            error = new ErrorHandler(message,400);
            }
        // Handling Mongoose Validation Error  (lorsque on remplit pas tous les champs les erreurs ne s'affichent pas en mm temps) 
        if(err.name =='ValidationErro') {
            const message = Object.values(err.values).map(value => value.message);
            error = new ErrorHandler(message,400);
        }
        res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }

   
}