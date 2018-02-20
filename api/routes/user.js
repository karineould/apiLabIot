var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

//get all users
router.get('/', function(req, res) {
    userController.findAll(req, res)
});

//get all users
router.post('/authenticate', function(req, res) {
    userController.authenticate(req, res)
});


//get one user by id
router.get('/:id', function(req, res) {
    userController.findById(req, res);
});


// create user
router.put('/create', function(req, res) {
    userController.create(req, res)
});


// update user
router.post('/:id', function(req, res) {
    userController.update(req, res)
});


//delete user
router.delete('/:id', function(req, res) {
    userController.delete(req, res)
});


module.exports = router;
