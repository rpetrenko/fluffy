// set up ======================================================================
var express  = require('express'),
    // create our app w/ express
    app      = express(),
    // mongoose for mongodb
    mongoose = require('mongoose'),
    // load the database config
    database = require('./config/database'),
    // logger
    morgan   = require('morgan'),
    // for authentication
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    //TODO get rid of mongoStore and use mongoose only
    config = require('./config/config'),
    passport = require('passport');

var port  	 = process.env.PORT || 8080; 				// set the port

//app.use(express.static(path.join(__dirname, 'public')));

// configuration ===============================================================
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console

app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// express/mongo session storage
app.use(session({
    secret: 'MEAN', // cookie secret
    saveUninitialized: true,
    resave: true,
    store: new mongoStore({
        url: config.db,
        collection: 'sessions',
        auto_reconnect: true
    })
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

//routes should be at the last
//app.use(app.router);

// bootstrap routes ======================================================================
require('./app/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
