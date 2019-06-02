var express = require ('express');
var router = express.Router();

var userDataModel = require ('../models/userData.js');

/* GET home page. */
router.get ('/userData/', function(req, res) {
    console.log ("GET DATA")
    userDataModel.find ((err, data) => {
        if (err) {
            console.log (err);
            throw err;
        }
        res.json (data);
    });
});

router.get ('/userData/:id', (req, res) => {
    userDataModel.findById (req.params.id, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

router.post ('/userData/', (req, res) => {
    userDataModel.create (req.body, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

router.put ('/userData/:id', (req, res) => {
    userDataModel.updateById (req.params.id, req.body, (err, post) => {
        if (err) throw err;
        res.json (post);
    });
});

router.delete ('/userData/:id', (req, res) => {
    userDataModel.findByIdAndRemove (req.body._id, req.body, (err, post) => {
        if (err) {
            console.log (err)
            throw err
        };
        res.json (post);
    });
});

module.exports = router;