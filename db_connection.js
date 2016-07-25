var mongoose = require('mongoose');

module.exports = {};

module.exports.createMongoConnection = function () {

    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connection to db has been opened')
    });
}

 