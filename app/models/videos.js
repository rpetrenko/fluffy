var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    code: {type: String, default: ''}
});

var Video = mongoose.model('Video', videoSchema);

//var test = new Video({
//    code: "1234"
//});

//test.save(function (err) {
//    if (err) console.log("Error saving video")
//});

module.exports = Video;