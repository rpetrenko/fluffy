var Character = require('./models/fluffy'),
    Video = require('./models/videos'),
    User = require('./models/user');

// for file upload with express
// busboy is a node.js module for parsing incoming HTML form data.
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

// for authentication
var passport = require('passport'),
    auth = require('./config/auth');

module.exports = function(app) {
    // for file upload
    app.use(busboy());

//    app.use(passport.initialize());

    var mongoose = require('mongoose'),
        LocalStrategy = require('passport-local').Strategy,
        User = mongoose.model('User');

    // Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });

    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        'errors': {
                            'email': { type: 'Email is not registered.' }
                        }
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        'errors': {
                            'password': { type: 'Password is incorrect.' }
                        }
                    });
                }
                return done(null, user);
            });
        }
    ));

    // User Routes
    var users = require('../public/js/controllers/users');
    app.post('/auth/users', users.create);
    app.get('/auth/users/:userId', users.show);

    // Check if username is available
    // todo: probably should be a query on users
    app.get('/auth/check_username/:username', users.exists);

    // Session Routes
    var session = require('../public/js/controllers/session');
    app.get('/auth/session', auth.ensureAuthenticated, session.session);
    app.post('/auth/session', session.login);
    app.delete('/auth/session', session.logout);


    // Characters related APIs
    app.get('/api/characters', function(req, res) {
        Character.find(function(err, characters) {
            if (err) res.send(err);
            res.json(characters);
        });
    });

    // delete existing character
    app.delete('/api/characters/:character_id', auth.ensureAuthenticated, function(req, res) {
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
    app.post('/api/characters', auth.ensureAuthenticated, function(req, res) {
        Character.create({
            name : req.body.name,
            desc : req.body.desc,
            picture : req.body.picture
        }, function(err, todo) {
            if (err) res.send(err);
            Character.find(function(err, characters) {
                if (err)
                    res.send(err);
                res.json(characters);
            });
        });
    });

    // update character
    app.put('/api/characters/:character_id', auth.ensureAuthenticated, function(req, res) {

        var query = {
            _id : req.params.character_id
        };

        var new_doc = {
            name: req.body.name,
            desc: req.body.desc,
            picture: req.body.picture
        };

        Character.findOneAndUpdate(query, new_doc, function(err, characters) {
            if (err) res.send(err);
            Character.find(function(err, characters) {
                if (err) res.send(err);
                res.json(characters);
            })
        });

    });
    // Videos related APIs
    // get videos
    app.get('/api/videos', function(req, res) {
        Video.find({}, null, {sort: {'code': -1}}, function(err, videos) {
            if (err) res.send(err);
            res.json(videos);
        });
    });
    // create video
    app.post('/api/videos', auth.ensureAuthenticated, function(req, res) {
        Video.create({
            code : req.body.code
        }, function(err, todo) {
            if (err) res.send(err);
            Video.find(function(err, videos) {
                if (err)
                    res.send(err);
                res.json(videos);
            });
        });
    });
    // delete video
    app.delete('/api/videos/:video_id', auth.ensureAuthenticated, function(req, res) {
        Video.remove({
            _id : req.params.video_id
        }, function(err, videos) {
            if (err) res.send(err);
            Video.find(function(err, videos) {
                if (err) res.send(err);
                res.json(videos);
            })
        });
    });

    // file upload API
    app.post('/upload', auth.ensureAuthenticated, function (req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/../public/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('back');           //where to go next
            });
        });
    });

    // main app route, the ui routing is handled by angluarjs
	app.get('*', function(req, res) {
        if(req.user) {
            console.log("setting up cookie with user info");
            res.cookie('user', JSON.stringify(req.user.user_info));
        }
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};