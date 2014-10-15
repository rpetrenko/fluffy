var mongoose = require('mongoose');

var kittySchema = mongoose.Schema({
    name: {type: String, default: ''},
    desc: {type: String},
    picture: {type: String},
    created: { type: Date, default: Date.now }
});

var Character = mongoose.model('Character', kittySchema);

//var character1 = new Character({
//    name: "Default name",
//    desc: "Default description",
//    picture: "katie_by_fluffyrockstar-d822y7a.png"
//});

//character1.save(function (err) {
//    if (err) console.log("Error saving character1")
//});

module.exports = Character;