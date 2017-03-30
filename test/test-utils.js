'use strict';

const mongoose = require('mongoose');
const expect = require('chai').expect;
const User = require('../server/model/user-schema');
const Image = require('../server/model/image-schema');

mongoose.Promise = global.Promise;

var TestUtils = {

    getObjectId: function() {
        return mongoose.Types.ObjectId();
    },

    expectEqualObjectId: function(got, exp) {
        var msg = 'Object IDs match';
        expect(got.toString(), msg).to.be.equal(exp.toString());
    },

    connectTestDb: function() {
        var testDbURI = 'mongodb://localhost:27017/pinterest_test';
        mongoose.Promise = global.Promise;
        mongoose.connect(testDbURI);
    },

    clearTestDb: function(coll, cb) {
        mongoose.connection.db.dropCollection(coll, cb);
    },

    saveUsers: function(users, cb) {
        User.collection.insert(users, err => {
            expect(err).to.be.null;
            if (err) {throw new Error(err);}
            else {cb();}
        });
    }
};


TestUtils.createUser = function(name) {
    var user = new User();
    user.username = name;
    user.local = {
        username: name,
        password: name
    };
    return user;
};

TestUtils.createImage = function(title, url) {
    var image = new Image();
    image.title = title;
    image.url = url;
    return image;
};

module.exports = TestUtils;
