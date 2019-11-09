const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;
let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    let user = this;
    if (!user.username) {
        return next(new Error('Missing username'));
    }
    if (!user.email) {
        return next(new Error('Missing user email'));
    }
    if (!user.password) {
        return next(new Error('Missing user password'));
    }
    next();
});

let User = mongoose.model('User', userSchema);

module.exports = User;