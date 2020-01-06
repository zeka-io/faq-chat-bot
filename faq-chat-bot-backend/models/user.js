//MongoDB initialize
var dbPort = 27017;
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:' + dbPort + '/ayca22db';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//MongoDB Schemas
var userSchema = mongoose.Schema({
    username: { type : String , unique : true },
    password: String,
    accessKey: String
});

//User model
var User = mongoose.model('User', userSchema);

module.exports = User;
