var mongoose = require('mongoose');

var loginDetailsData = new mongoose.Schema ({
    username: String,
    password: String,
    currentSessions: []
});

module.exports = mongoose.model('loginData', loginDetailsData);