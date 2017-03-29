'use strict';

const User = require('../model/user-schema');

const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const hash = require('../common/hash-password');

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser( function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Strategy for local password verification
    passport.use(new LocalStrategy({

        /* These are defaults, so no need to specify them here
        userNameField: "username",
        passwordField: "password",
        passReqToCallback: true,
        */

        session: true
        },
        function(username, password, done) {
            User.findOne({'local.username': username}, function(err, user) {
              if (err) { return done(err); }
              if (!user) { return done(null, false); }

              var hashed = hash.getHash(password);

              if (user.local.password !== hashed) { return done(null, false); }
              return done(null, user);
            });
        }
    ));

    // Strategy for Twitter authentication
    passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: 'http://127.0.0.1:8080/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
		// From https://scotch.io/tutorials/easy-node-authentication-twitter
		process.nextTick(function() {
			User.findOrCreate(token, profile, (err, user) => {
                return done(err, user);
            });
		});
    } // function
	));

};

