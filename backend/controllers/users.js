const User = require('../models/schemas/user');

exports.registerUser = (req, res, next) => {
    let userData = {};
    // validate username
    if (req.body.username && typeof req.body.username === 'string') {
        // replace spaces with underscores
        req.body.username = req.body.username.replace(/ /g,"_");
        userData.username = req.body.username;
    }
    else {
        return res.status(400).send('Invalid user password');
    }
    // validate email
    // http://emailregex.com
    let userEmailIsNotValid = !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email));
    if (req.body.email && typeof req.body.email === 'string') {
        if (userEmailIsNotValid) {
            return res.status(400).send('Invalid user email');
        }
        else {
            userData.email = req.body.email;
        }
    }
    else {
        return res.status(400).send('Invalid user email');
    }
    // validate password
    if (req.body.password && typeof req.body.password === 'string') {
        userData.password = req.body.password;
    }
    else {
        return res.status(400).send('Invalid user password');
    }
    let newUser = new User(userData);
    newUser.save()
        .then(user => {
            return res.sendStatus(200);
        })
        .catch(err => {
            if (err.code === 11000) {
                return res.status(400).send('User email already registered');
            }
            return next(err);
        });
};