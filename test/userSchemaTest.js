

const expect = require('chai').expect;
const User = require('../server/model/user-schema.js');

const Utils = require('./test-utils');

const getObjectId = Utils.getObjectId;

Utils.connectTestDb();

beforeEach( (done) => {
    Utils.connectTestDb();
    done();
});

afterEach( (done) => {
    Utils.disconnectTestDb();
    done();
});

describe('UserSchema', function() {

    var user = null;

    beforeEach( done => {
        user = new User();
        user.username = 'aaa';
        user.local = {
            username: 'aaa',
            password: 'ccc'
        };
        user.save( err => {
            if (err) {throw new Error(err);}
            done();
        });
    });

    afterEach( (done) => {
        user = null;
        User.remove({}, err => {
            if (err) {throw new Error(err);}
            done();
        });
    });

    it('should have name and password', function() {
        var newUser = new User();
        newUser.validateSync();
        expect(newUser.errors.username).to.exist;
    });

    it('can have information updated', function(done) {
        var obj = {twitter: {username: 'aaa'}};
        var username = {username: 'aaa'};
        User.findOne(username, (err, data) => {
            if (err) {throw new Error(err);}
            else {
                data.update(obj, err => {
                    if (err) {throw new Error(err);}
                    User.findOne(username, (err, userData) => {
                        if (err) {throw new Error(err);}
                        expect(userData.twitter).to.exist;
                        expect(userData.twitter.username).to.be.equal('aaa');
                        done();
                    });
                });
            }
        });
    });

    it('can add images for the user', function(done) {
        var username = {username: 'aaa'};
        User.findOne(username, (err, userdata) => {
            if (err) {throw new Error(err);}
            else {
                var newImageId = getObjectId();
                var obj = {imageId: newImageId, id: userdata._id};

                User.addImage(obj, (err, res) => {
                    if (err) {throw new Error(err);}
                    expect(res.ok).to.be.equal(1);

                    User.findOne({_id: userdata._id}, (err, userdata) => {
                        if (err) {throw new Error(err);}
                        expect(userdata.added.length).to.equal(1);
                        Utils.expectEqualObjectId(userdata.added[0],
                            newImageId);
                        done();
                    });

                });

            }
        });
    });

    it('can have likes added and removed', function(done) {
        var likedImageId = getObjectId();

        var obj = {like: true, imageId: likedImageId, username: 'aaa'};
        User.addLikedImage(obj, (err, res) => {
            console.log(JSON.stringify(err));
            expect(err).to.be.null;
            expect(res.ok).to.be.equal(1);

            User.findOne({username: 'aaa'}, (err, user) => {
                expect(err).to.be.null;
                expect(user.liked).to.have.length(1);

                User.removeLikedImage(obj, (err, res) => {
                    expect(err).to.be.null;
                    expect(res.ok).to.be.equal(1);

                    User.findOne({username: 'aaa'}, (err, user) => {
                        expect(err).to.be.null;
                        expect(user.liked).to.have.length(0);
                        done();
                    });
                });

            });

        });

    });

    it('can have links to images added and removed', function(done) {
        var linkedImageId = getObjectId();

        var obj = {link: true, imageId: linkedImageId, username: 'aaa'};
        User.addLinkedImage(obj, (err, res) => {
            console.log(JSON.stringify(err));
            expect(err).to.be.null;
            expect(res.ok).to.be.equal(1);

            User.removeLinkedImage(obj, (err, res) => {
                expect(err).to.be.null;
                expect(res.ok).to.be.equal(1);
                User.findOne({username: 'aaa'}, (err, user) => {
                    expect(err).to.be.null;
                    expect(user.linkedTo).to.have.length(0);
                    done();
                });
            });

        });

    });

});
