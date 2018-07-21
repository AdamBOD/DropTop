var express = require ('express');
var router = express.Router();

var userDataModel = require ('../models/userData.js');

/* GET home page. */
router.get ('/', function(req, res) {
    userDataModel.find ((err, data) => {
        if (err) throw err;
        res.json (data);
    });
});

router.get ('/:id', (req, res) => {
    userDataModel.findById (req.params.id, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

router.post ('/', (req, res) => {
    userDataModel.create (req.body, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

router.put ('/:id', (req, res) => {
    userDataModel.updateById (req.params.id, req.body, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

router.delete ('/:id', (req, res) => {
    userDataModel.deleteById (req.params.id, req.body, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

module.exports = router;