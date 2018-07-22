var express = require ('express');
var router = express.Router();

var loginDetailsModel = require ('../models/loginDetails.js');

/* GET home page. */
router.post ('/login', function(req, res) {
    loginDetailsModel.find ((err, data) => {
        if (err) throw err;
        res.json (data);
    });
});

router.post ('/register', (req, res) => {
    loginDetailsModel.create (req.body, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

module.exports = router;