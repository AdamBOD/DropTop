var mongoose = require('mongoose');

var userData = new mongoose.Schema ({
    name: String,
    data: String,
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('userData', userData);