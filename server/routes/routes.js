'use strict';

let path = process.cwd();
let ctrlPath = path + '/server/ctrl';

const ImageController = require(ctrlPath + '/image-ctrl.server.js');
const UserController = require(ctrlPath + '/user-ctrl.server.js');
const debug = require('debug')('book:routes');

let _log = function(msg) {
    console.log('[LOG@SERVER]: ' + msg);
};

/* Function for debug logging requests.*/
let reqDebug = function(req) {
	_log('\t\tHeaders: ' + JSON.stringify(req.headers));
	_log('\t\tBody: ' + JSON.stringify(req.body));
	_log('\t\tParams: ' + JSON.stringify(req.params));
	_log('\t\tUrl:' + JSON.stringify(req.url));
	_log('\t\tText:' + JSON.stringify(req.text));
	_log('\t\tContent:' + JSON.stringify(req.content));
	_log('\t\tQuery:' + JSON.stringify(req.query));
};

const _u = function(username) {
    return '|' + username + '|';
};

// Msg objects sent back to the client
let notAuthorized = {msg: 'Operation not authorized. Log in first.'};
let errorInternal = {msg: 'Server internal error.'};
let errorForbidden = {msg: 'Requested action forbidden.'};

/* Contains all routes for this application. */
module.exports = function(app, passport) {

    /* Renders a pug template.*/
    let renderPug = function(req, res, pugFile) {
        let isAuth = req.isAuthenticated();
        debug('renderPug auth: ' + isAuth + ' file: ' + pugFile);
        res.render(path + '/pug/' + pugFile, {isAuth: isAuth});
    };

    /* loggedIn func from clementine.js. */
	let isLoggedInOrRedirect = function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
        else {
            debug('Redirecting non-auth user to /login');
			return res.redirect('/login');
		}
	};

    let isLoggedInAjax = function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
        else {
            debug('Non-authorized ajax call received');
            return res.status(403).json(notAuthorized);
        }
    };


    /* Returns the username from the request. Logs an error if username is not
     * present. */
    let getUserName = function(req, route) {
        if (req.user) {
            if (req.user.username) {
                return req.user.username;
            }
            else {
                logError(route, 'getUserName: No req.user.username exists.',
                    req);
            }
        }
        else {
            logError(route, 'getUserName: No req.user exists.', req);
        }
        return null;
    };

    let logErrorReq = function(req) {
        console.error('Error REQ headers: ');
        reqDebug(req);
    };

    /* Logs an error with route and request information included.*/
    let logError = function(route, err, req) {
        let date = new Date();
        console.error(date + ' [ERROR@SERVER] route ' + route + ' | ' + err);
        if (req) {
            logErrorReq(req);
        }
    };

    let debugJSON = function(msg, obj) {
        debug(msg + ' ' + JSON.stringify(obj));
    };

    // CONTROLLERS
    let userController = new UserController(path);
    let imageController = new ImageController(path);

    //----------------------------------------------------------------------
    // ROUTES
    //----------------------------------------------------------------------

	app.route('/')
		.get((req, res) => {
            renderPug(req, res, 'index.pug');
		});

	app.route('/about')
		.get((req, res) => {
            renderPug(req, res, 'about.pug');
		});

	app.route('/all-images')
		.get((req, res) => {
            renderPug(req, res, 'images.pug');
		});

	app.route('/signup')
		.get((req, res) => {
            renderPug(req, res, 'signup.pug');
		});

	app.route('/login')
		.get((req, res) => {
            renderPug(req, res, 'login.pug');
		});

	app.route('/loginFailed')
		.get((req, res) => {
            res.render(path + '/pug/login.pug',
                {isAuth: false, loginFailed: true});
        });

    // If a user logs out, return to main page
	app.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});

	app.route('/profile')
		.get(isLoggedInOrRedirect, (req, res) => {
            renderPug(req, res, 'profile.pug');
		});

    // Handle registration of user
    app.route('/forms/signup')
        .post((req, res) => {
            debug('Got a signup form GET request..');
            userController.addLocalUser(req, res);
        });

    //----------------------------------------------------
    // /users/ Routes for accessing/manipulating user data
    //----------------------------------------------------

    // Called by client to check their authentication status
	app.route('/users/amiauth')
		.get((req, res) => {
            let data = {isAuth: false};
            if (req.isAuthenticated()) {
                data.isAuth = true;
                data.username = req.user.username;
                userController.getUserID(data.username, (err, userID) => {
                    if (err) {
                        logError('/users/amiauth', err, req);
                        res.status(500).json({error: 'Failed to authenticate'});
                    }
                    else {
                        data.userID = userID;
                        res.status(200).json(data);
                    }
                });
            }
            else {
                res.status(200).json(data);
            }
		});


    app.route('/users/:name')
        .get(isLoggedInAjax, (req, res) => {
            let username = req.params.name;
            if (username === req.user.username) {
                userController.getUserByName(username, (err, data) => {
                    if (err) {
                        logError('/users/' + username, err, req);
                        res.status(500).json(errorInternal);
                    }
                    else {
                        delete data.local.password;
                        res.json(data);
                    }
                });
            }
            else {
                // Forbidden
                logError('/users/' + username,
                    'Forbidden action attempted.', req);
                res.status(403).json(errorForbidden);
            }
        });

    app.route('/users/update')
        .post(isLoggedInAjax, (req, res) => {
            let username = getUserName(req, '/user/update');
            let userInfo = req.body;
            debugJSON('/users/update ' + _u(username) + ' info: ', userInfo);
            userController.updateUserInfo(username, userInfo, (err, data) => {
                if (err) {
                    logError('/users/update', err, req);
                    res.status(500).json(errorInternal);
                }
                else {
                    res.json(data);
                }
            });
        });

    app.route('/users')
        .get(isLoggedInAjax, (req, res) => {
            let username = req.user.username;
            userController.getUserByName(username, (err, data) => {
                if (err) {
                    logError('/users/' + username, err, req);
                    res.status(500).json(errorInternal);
                }
                else {
                    delete data.local.password;
                    res.json(data);
                }
            });
        });

    //--------------------------------------
    // Images
    //--------------------------------------

    app.route('/images')

        .get( (req, res) => {
            imageController.getAllImages( (err, data) => {
                if (err) {
                    logError('/images', err, req);
                    res.status(500).json(errorInternal);
                }
                else {
                    debugJSON('GET /images result (200): ', data);
                    res.status(200).json(data);
                }
            });
        })

        /* Used for updating existing images. */
        .put(isLoggedInAjax, (req, res) => {
            debugJSON('PUT /images req.body: ', req.body);
            let username = req.user.username;
            imageController.updateImage(username, req.body, (err, result) => {
                if (err) {
                    logError('/images', err, req);
                    res.status(500).json(errorInternal);
                }
                else {
                    debugJSON('PUT /images result (200): ', result);
                    res.status(200).json({msg: 'OK'});
                }

            });
        })

        .post(isLoggedInAjax, (req, res) => {
            debug('POST /images');
            debugJSON('POST /images req.body: ', req.body);
            let username = req.user.username;
            imageController.addImage(username, req.body, (err, result) => {
                if (err) {
                    logError('/images', err, req);
                    res.status(500).json(errorInternal);
                }
                else {
                    debugJSON('POST /images result (200): ', result);
                    res.status(200).json({msg: 'OK'});
                }
            });

        })

        .delete(isLoggedInAjax, (req, res) => {
            debug('DELETE /images');
            debugJSON('DELETE /images req.body: ', req.body);
            let username = req.user.username;
            imageController.removeImage(username, req.body, (err, result) => {
                if (err) {
                    logError('/images', err, req);
                    res.status(500).json(errorInternal);
                }
                else {
                    debugJSON('DELETE /images result (200): ', result);
                    res.status(200).json({msg: 'OK'});
                }
            });

        });

    //--------------------------------------
    // User registration and authentication
    //--------------------------------------

	app.get('/auth/twitter',
		passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', { failureRedirect: '/login' }),
		(req, res) => {
			// Successful authentication, redirect home.
			res.redirect('/profile');
		});


    // Logs user in via form (after successful authentication)
	app.route('/auth/userlogin')
        .post(passport.authenticate('local',
            { failureRedirect: '/loginFailed' }), (req, res) => {
			res.redirect('/');
		});

};
