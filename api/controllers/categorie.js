var mongoose = require('mongoose');
var Categorie   = require('../models/categorie');

exports.getAll = function(req, res) {
    Categorie.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};
