express = require('express');
var router = express.Router();

// api Routes
router.get('/', function(req, res) {
    res.send('Welcom to LabIot API');
});

module.exports = router;
