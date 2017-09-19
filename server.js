// server.js

    // set up ========================
    var express  = require('express');     	// create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var jwt = require("jsonwebtoken");
    var path = require('path');
    require('dotenv').config();
    require('./app/model/Db');
    require('./app/config/passport');

    // routes ========================
   var routesApi = require('./app/routes/routes.js'); //modifi
   var app = express();


    // configuration =================

    app.use(express.static(path.join(__dirname, 'public')));        // set the static files location /public/img will be /img for users
    app.use(express.static(path.join(__dirname, 'client')));
    app.use(express.static(path.join(__dirname, 'views')));
	app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use('/api', routesApi);
    app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
     	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    	next();
    });

    module.exports = app;

