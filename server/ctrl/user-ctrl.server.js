'use strict';

// Used for MongoDB access
const User = require('../model/user-schema');
const hash = require('../common/hash-password');

const USER_FILTER = {_id: 1, username: 1, added: 1,
    liked: 1, linkedTo: 1};

module.exports = function(path) {

    let errorHandler = function(err, res) {
        console.error('userController Server error: ' + err);
        res.sendStatus(500);
    };

    // Adds one user to the database. Fails if a user exists already. This is
    // used only for local registration. github users are added in passport.js
    this.addLocalUser = function(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            User.findOne({username: username}, function(err, user) {
                if (err) {errorHandler(err, res);}
                // If the user doesn't exist, create new one and store into DB
                else if (!user) {
					let newUser = new User();
                    newUser.username = username;
                    newUser.local = {};
                    newUser.local.username = username;
                    newUser.local.password = hash.getHash(password);
                    newUser.registeredOn = new Date().getTime();

                    newUser.save(function(err) {
                        if (err) {errorHandler(err, res);}
                        else {
                            console.log('Register local user ' + username +
                                ' with pw ' + password);

                            res.url = '/auth/userLogin';
                            res.render(path + '/pug/signup_done.pug',
                                {ok: true, name: username});
                        }
                    });

                }
                else {
                    res.render(path + '/pug/signup_done.pug',
                        {ok: false, name: username});
                }
            });
        }
        else {
            res.sendStatus(400);
        }
    };

    let sendAuthenticatedUserInfo = function(res, username) {
        User.findOne({username: username})
            .exec(function(err, user) {
                if (err) {return errorHandler(err, res);}

                if (user) {
                    return res.json(user);
                }
                else {
                    let obj = {error:
                        'No user ' + username + ' found in database.'};
                    return res.json(obj);
                }
        });
    };

    this.getUserList = function(cb) {
        User.find({}, {username: 1, _id: 0}, (err, result) => {
            if (err) {cb(err);}
            else {
                console.log('getUserList result' + JSON.stringify(result));
                cb(null, result);
            }
        });
    };

    /* Returns the relevant data for user wall. */
    this.getPublicUserWall = function(username, cb) {
        let filterObj = {username: 1, _id: 0, linkedTo: 1};
        User.findOne({username: username}, filterObj)
            .populate('linkedTo')
            .exec((err, result) => {
                if (err) {cb(err);}
                else {
                    cb(null, result);
                }
            });
    };

    /* Responds with info about the requested user (if authenticated).*/
    this.getUser = function(req, res) {
        if (req.isAuthenticated()) {
            console.log('getUser Req auth, user ' + JSON.stringify(req.user));
            let username = req.user.username;
            sendAuthenticatedUserInfo(res, username);
        }
        else {
            res.json({name: 'guest'});
        }
    };

    this.getUserID = function(username, cb) {
        User.findOne({username: username}, (err, user) => {
            if (err) {return cb(err);}
            else if (user) {return cb(null, user._id);}
            else {return cb(null, null);}
        });

    };

    /* Given username, fetches corresponding user data from the DB and passes
     * it to callback.*/
    this.getUserByName = function(username, cb) {
        User.findOne({username: username}, USER_FILTER)
            .populate('added')
            .populate('liked')
            .populate('linkedTo')
            .exec( (err, user) => {
                if (err) {
                    return cb(err);
                }
                else if (user) {
                    return cb(null, user);
                }
                else {
                    return cb(null, null);
                }
        });
    };

    /* Adds a venue where user is going. Needs appID and username to perform
     * the update.*/
    this.updateUserInfo = function(username, info, cb) {
        let updateObj = {$set: info};
        User.update({username: username}, updateObj, (err, data) => {
            if (err) {return cb(err);}
            else {
                return cb(null, data);
            }
        });
    };

};

