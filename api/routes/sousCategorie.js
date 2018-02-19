var express = require('express');
var router = express.Router();
var sousCategorie = require('../controllers/sousCategorie');

// get all sousCategories
router.get('/', function(req, res) {
    return sousCategorie.getAll(req, res);
});

// get detail of sousCategorie
router.get('/:id', function(req, res) {
    return sousCategorie.findById(req, res);
});

//create sousCategorie
router.put('/create', function(req, res) {
    return sousCategorie.create(req, res);
});

// update sousCategorie
router.post('/:id', function(req, res) {
    return sousCategorie.update(req, res);
});

// delete sousCategorie
router.delete('/:id', function(req, res) {
    return sousCategorie.delete(req, res);
});

module.exports = router;
