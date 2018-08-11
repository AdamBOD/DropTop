var express = require ('express');
var router = express.Router();

var loginDataModel = require ('../models/loginData');

/* GET home page. */
router.post ('/', function(req, res) {
    loginDataModel.find ((err, data) => {
        if (err) throw err;
        res.json (data);
    });
});

router.put ('/', (req, res) => {
    loginDataModel.create (req.body, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

module.exports = router;