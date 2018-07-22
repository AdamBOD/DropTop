var mongoose = require('mongoose');

var loginDetailsData = new mongoose.Schema ({
    username: String,
    password: String
});

module.exports = mongoose.model('loginDetailsData', loginDetailsData);