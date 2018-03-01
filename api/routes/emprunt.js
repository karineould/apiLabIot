var express = require('express');
var router = express.Router();
var emprunt = require('../controllers/emprunt');

// get all emprunts
router.get('/', function(req, res) {
    return emprunt.findAll(req, res);
});

// get detail of emprunt
router.get('/:id', function(req, res) {
    return emprunt.findById(req, res);
});

//create emprunt
router.put('/create', function(req, res) {
    return emprunt.create(req, res);
});

// get id emprunt by user_mail & item
router.post('/byUserAndItem', function(req, res) {
    return emprunt.findByUserMailAndItem(req, res);
});

// update emprunt
router.post('/:id', function(req, res) {
    return emprunt.update(req, res);
});

// delete all emprunts
router.delete('/reset', function(req, res) {
    return emprunt.reset(req, res);
});

// delete emprunt
router.delete('/:id', function(req, res) {
    return emprunt.delete(req, res);
});



module.exports = router;
