// Create and send token and save in the cookies
const sendToken = function(user, statusCode, res){
    // create token
    const token = user.getJwtToken();
    // Options for cookie
    const options = {
        expires: new Date(Date.now()+ 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        token,
        user
    })
}


module.exports = sendToken;