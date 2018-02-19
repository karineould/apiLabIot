var jwt    = require('jsonwebtoken');
var app = require('../../server');
var User   = require('../models/user');
var crypto = require('crypto');


//Find all user
exports.findAll = function(req, res) {
    User.find({}, function(err, users) {
        if (err) res.json(err);
        res.json(users);
    });
};


//find user by id
exports.findById = function(req, res) {
    var id = req.params.id;

    if (id) {
        User.find({'_id':id},function(err, result) {
            return res.send(result);
        });
    }
    return res.sendStatus(400);
};

//Create user
exports.create = function(req, res) {
    var email = req.body.email;
    var password = userController.cryptPassword(req.body.password);

    // create a sample user
    var newUser = new User({
        email: email,
        hash: password.hash,
        salt: password.salt,
        admin: false
    });

    // save the sample user
    newUser.save(function(err, result) {
        if (err){
            res.status(400).json(err);
        }

        console.log('User saved successfully');
        res.json({ user: result._id});
    });

};

//Create userAdmin
exports.createAdmin = function(req, res) {
    var secret_access = req.body.secret_access;
    var email = req.body.email;
    var password = userController.cryptPassword(req.body.password);

    if (!secret_access) return res.status(401).send({ auth: false, message: 'No secret token provided.' });
    if (secret_access != app.get('secret_access_create_admin')) return res.status(405).send({ auth: false, message: 'No allowed' });

    // create a sample admin
    var newAdmin = new User({
        email: email,
        hash: password.hash,
        salt: password.salt,
        admin: true
    });

    // save the sample admin
    newAdmin.save(function(err, result) {
        if (err){
            res.status(400).json(err);
        }

        console.log('Admin saved successfully');
        res.json({ admin: result._id});
    });
};

//update user
exports.update = function(req, res) {
    var id = req.params.id;
    var updates = [];

    if (id) {
        updates['email'] = req.body.email;
        updates['password'] = authController.cryptPassword(req.body.password);

        User.findByIdAndUpdate(id, { $set: { email: email, password: password} },
            function (err, result) {
                if (err) return console.log(err);
                console.log(result._id);
                console.log('Updated '+ result._id +' user');
                return res.sendStatus(202);
            });
    }
    return res.sendStatus(400);
};


//Delete user
exports.delete = function(req, res){
    var id = req.params.id;
    if (id) {
        User.remove({'_id': id}, function (err) {
            if (err) throw err;
            return res.send({deleted: id});
        });
    }
    return res.sendStatus(400);
};


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
                    userId: user._id,
                    admin: user.admin,
                    email: user.email
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
