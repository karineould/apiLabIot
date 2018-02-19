var mongoose = require('mongoose');
var Emprunt   = require('../models/emprunt');


exports.getAll = function(req, res) {
    Emprunt.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};
