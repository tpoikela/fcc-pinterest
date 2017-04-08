/*
 * Server entry point file for the Pinterest clone.
 */
'use strict';

const serverName = 'fcc-Pinterest-clone';
const debug = require('debug')('pint:server');

loadDotEnv();

// Load required npm modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

// App-specific requires
const routes = require('./server/routes/routes.js');

debug(serverName + ' All requires loaded OK.');

let app = express();
app.set('view engine', 'pug');

require('./server/config/passport')(passport);

app.url = process.env.APP_URL;
debug(serverName + ' The full APP url: ' + app.url);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

// Initialize resource paths for the server
initResourcePaths(app);

initAndConfigMiddleware(app);

routes(app, passport);

let port = process.env.PORT || 8080;
app.listen(port, () => {
	debug(serverName + ' Server listening on port ' + port + '...');
});

console.log('Server was started');

//---------------------------------------------------------------------------
// HELPER FUNCTIONS
//---------------------------------------------------------------------------

/* Loads config from .env or skips the loading in production. Production server
* is configured via heroku config:set */
function loadDotEnv() {
    if (process.env.NODE_ENV !== 'production') {
        debug(serverName + ' server Not in prod. Loading local .env file.');
        require('dotenv').load();
        debug('Loaded .env file OK. Node env: ' + process.env.NODE_ENV);
    }
    else {
        debug(serverName + ' server Running in PRODUCTION environment');
    }
}

function initResourcePaths(app) {
    app.use('/build', express.static(process.cwd() + '/build'));
    app.use('/ctrl', express.static(process.cwd() + '/server/ctrl'));
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/common', express.static(process.cwd() + '/server/common'));
    app.use('/pug', express.static(process.cwd() + '/pug'));
}

function initAndConfigMiddleware(app) {
    app.use(helmet());

    app.use(session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true
    }));

    app.locals.pretty = true;

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use(morgan('combined'));

}
