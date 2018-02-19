var express = require('express');
var router = express.Router();
var emprunt = require('../controllers/emprunt');

// get all emprunts
router.get('/', function(req, res) {
    return emprunt.getAll(req, res);
});

// get detail of emprunt
router.get('/:id', function(req, res) {
    return emprunt.findById(req, res);
});

//create emprunt
router.put('/create', function(req, res) {
    return emprunt.create(req, res);
});

// update emprunt
router.post('/:id', function(req, res) {
    return emprunt.update(req, res);
});

// delete emprunt
router.delete('/:id', function(req, res) {
    return emprunt.delete(req, res);
});

module.exports = router;
