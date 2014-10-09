var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {type: String, default: ''},
    password: {type: String},
    role: {type: String}
});

var User = mongoose.model('User', userSchema);

var admin_user = new User({
    name: "admin",
    password: "admin",
    role: "admin"
});

admin_user.save(function (err) {
    if (err) console.log("Error saving admin_user")
});

module.exports = User;