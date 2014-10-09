var mongoose = require('mongoose');

var kittySchema = mongoose.Schema({
    name: {type: String, default: ''},
    file: {type: String},
    desc: {type: String}
});

var Character = mongoose.model('Character', kittySchema);

var character1 = new Character({
    name: "Default name",
    desc: "Default description"
});

character1.save(function (err) {
    if (err) console.log("Error saving character1")
});

module.exports = Character;