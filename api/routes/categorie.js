var express = require('express');
var router = express.Router();
var categorie = require('../controllers/categorie');

// get all categories
router.get('/', function(req, res) {
    return categorie.findAll(req, res);
});

// get detail of categorie
router.get('/:id', function(req, res) {
    return categorie.findById(req, res);
});

//create categorie
router.put('/create', function(req, res) {
    return categorie.create(req, res);
});

// update categorie
router.post('/:id', function(req, res) {
    return categorie.update(req, res);
});

// delete categorie
router.delete('/:id', function(req, res) {
    return categorie.delete(req, res);
});

module.exports = router;
