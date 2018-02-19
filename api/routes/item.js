var express = require('express');
var router = express.Router();
var item = require('../controllers/item');

// get all items
router.get('/', function(req, res) {
    return item.getAll(req, res);
});

// get detail of item
router.get('/:id', function(req, res) {
    return item.findById(req, res);
});

//create item
router.put('/create', function(req, res) {
    return item.create(req, res);
});

// update item
router.post('/:id', function(req, res) {
    return item.update(req, res);
});

// delete item
router.delete('/:id', function(req, res) {
    return item.delete(req, res);
});

module.exports = router;
