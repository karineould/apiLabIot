var mongoose = require('mongoose');
var Item   = require('../models/item');


exports.getAll = function(req, res) {
    Item.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};

exports.getAll = function(req, res) {
    Item.find({}, function(err, result) {
        if (err) res.json(err);
        res.json(result);
    });
};
