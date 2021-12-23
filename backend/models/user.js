const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter your name'],
        maxlength: [30,'Your name connat exceed 30 characters']
    },
    email: {
        type: String,
        require: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be loonger the 6 characater'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
// Encrypting password before saving user 
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
});
userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_TIME});
}
userSchema.methods.comparePassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword,this.password);
}
module.exports = mongoose.model("User",userSchema);