var mongoose = require('mongoose');
var SousCategorie   = require('../models/sousCategorie');


exports.getAll = function(req, res) {
    SousCategorie.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};
