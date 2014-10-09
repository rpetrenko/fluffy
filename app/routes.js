//var Todo = require('./models/todo');
var Character = require('./models/fluffy');

// for file upload with express
// busboy is a node.js module for parsing incoming HTML form data.
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation



module.exports = function(app) {
    // for file upload
    app.use(busboy());

    // list all characters
    app.get('/api/characters', function(req, res) {
        Character.find(function(err, characters) {
            if (err) res.send(err);
            res.json(characters);
        });
    });

    // delete existing character
    app.delete('/api/characters/:character_id', function(req, res) {
        Character.remove({
            _id : req.params.character_id
        }, function(err, characters) {
            if (err) res.send(err);
            Character.find(function(err, characters) {
                if (err) res.send(err);
                res.json(characters);
            })
        });
    });

    // create character
    app.post('/api/characters', function(req, res) {
        Character.create({
            name : req.body.name,
            desc : req.body.desc
        }, function(err, todo) {
            if (err) res.send(err);
            // get and return all the todos after you create another
            Character.find(function(err, characters) {
                if (err)
                    res.send(err);
                res.json(characters);
            });
        });

    });


    app.post('/upload', function (req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('back');           //where to go next
            });
        });
    });


//    app.post('/api/login', function(req, res) {
//       console.log("inside /api/login");
//    });
//
//    app.post('/api/logout', function(req, res) {
//        console.log("inside /api/logout");
//    });
//
//    app.post('/api/register', function(req, res) {
//        console.log("inside /api/register");
//    });

    app.post('/api/users', function(req, res) {
        User.find(function(err, users) {
            if (err) res.send(err);
            res.json(users);
        });
    });

    // main app route, the ui routing is handled by angluarjs
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};