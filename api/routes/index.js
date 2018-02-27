var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');


// api Routes
router.get('/', function(req, res) {
    res.send('Welcom to LabIot API');
});


//Create first admin user
router.put('/createAdmin', function(req, res) {
    userController.createAdmin(req, res);

});

//get all users
router.post('/authenticate', function(req, res) {
    userController.authenticate(req, res)
});



module.exports = router;
