var mongoose = require('mongoose');

var loginDetailsData = new mongoose.Schema ({
    email: String,
    password: String,
    currentSessions: []
});

module.exports = mongoose.model('loginData', loginDetailsData);