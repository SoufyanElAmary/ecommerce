const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const user = require("../models/user");

isAuthenticatedUser =  catchAsyncErrors(async function(req, res, next) {
    const { token } = req.cookies;
    if(!token) {
        return next(new ErrorHandler('login first to access the resource',401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id);
    next();

})

module.exports = isAuthenticatedUser