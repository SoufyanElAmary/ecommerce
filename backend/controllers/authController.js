const User = require('../models/user');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a user => /api/v1/register
registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: '868uzjhgh5657fj',
            url:'https://picsum.photos/200/300'
        } 
    });
    sendToken(user,200,res);
  
});
//  login user = api/v1/login
loginUser = catchAsyncError( async function(req, res, next) {
    const {email, password} = req.body;
    // check if pass and email entered by user
    if(!email || !password) {
        return next(new ErrorHandler('please enter email and password',400))
    }
    // finding user in database 
    const user = await User.findOne({email}).select('+password');
    if(!user) {
        return next(new ErrorHandler('Invalid email or password',401))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid password',401));
    }
    sendToken(user,200,res);
});
// logout user =  api/v1/logout
logoutUser = function(req, res, next) {
    res.cookie('token',null, {
        expire: new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        sucess: true,
        message: "logout end"

    })

}
module.exports = {registerUser , loginUser , logoutUser};