var jwt    = require('jsonwebtoken');
var app = require('../../server');
var User   = require('../models/user');
var crypto = require('crypto');


exports.cryptPassword = function(password) {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return {salt: salt, hash: hash};
};


exports.checkPassword = function(req, password, salt) {
    var hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('hex');
    return password === hash;
};

exports.authenticate = function(req, res){
    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) {
            res.status(500).json(err);
        }

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (this.checkPassword(req, user.password, user.salt)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    user_id: user._id,
                    admin: user.admin,
                    isPro: user.isPro
                };

                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }

    });
};
