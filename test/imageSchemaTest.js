
'use strict';

const expect = require('chai').expect;
const Utils = require('./test-utils');
const Image = require('../server/model/image-schema.js');

const getObjectId = Utils.getObjectId;

// Utils.connectTestDb();
beforeEach( (done) => {
    Utils.connectTestDb();
    done();
});

afterEach( (done) => {
    Utils.disconnectTestDb();
    done();
});

const expectArrLength = (testImg, arrName, arrLength, cb) => {
    Image.findOne({_id: testImg._id}, (err, img) => {
        expect(err).to.be.null;
        if (!img) {
            throw new Error('No image with ID ' + testImg._id);
        }
        else {
            expect(img[arrName]).to.have.length(arrLength);
            cb();
        }
    });
};

let testUrl = 'http://nonsense.com/test.png';

describe('Image-model', function() {

    let testImg = null;

    beforeEach( (done) => {
        testImg = new Image({
            title: 'xxx',
            url: 'http://yyy.com/img.png',
            addedBy: getObjectId(),
            broken: false
        });
        testImg.save( err => {
            if (err) {throw new Error(err);}
            done();
        });
    });

    afterEach( (done) => {
        testImg = null;
        Image.remove({}, err => {
            if (err) {throw new Error(err);}
            done();
        });
    });

    it('should have name, url and owner', function() {
        let img = new Image();
        img.url = testUrl;
        let errors = img.validateSync().errors;

        expect(errors.title).to.exist;
        expect(errors.url).to.not.exist;
    });

    it('should be saved properly to DB', function(done) {
        let obj = {
            linkedBy: 'myusername',
            url: testUrl,
            title: 'A test image for the user',
            broken: false
        };

        Image.createNew(obj, (err, img) => {
            expect(err).to.be.null;
            expect(img._id).to.exist;
            done();
        });

    });

    it('can have likes added to it', function(done) {
        let obj = {id: testImg._id, likedBy: getObjectId()};
        Image.addLike(obj, (err) => {
            expect(err).to.be.null;

            expectArrLength(testImg, 'likedBy', 1, () => {
                done();
            });

        });
    });

    it('can have links added to it', function(done) {
        let obj = {id: testImg._id, linkedBy: getObjectId()};
        Image.addLink(obj, (err) => {
            expect(err).to.be.null;

            expectArrLength(testImg, 'linkedBy', 1, () => {
                done();
            });


        });
    });


    it('can have likes removed from it', function(done) {
        let obj = {id: testImg._id, likedBy: getObjectId()};
        Image.addLike(obj, (err) => {

            expect(err).to.be.null;
            obj.userId = obj.likedBy;

            Image.removeLike(obj, (err, res) => {
                expect(err).to.be.null;
                expect(res.ok).to.be.equal(1);

                expectArrLength(testImg, 'likedBy', 0, () => {
                    done();
                });

            });
        });
    });

    it('can have links removed from it', function(done) {
        let obj = {id: testImg._id, linkedBy: getObjectId()};
        Image.addLink(obj, (err) => {
            expect(err).to.be.null;
            obj.userId = obj.linkedBy;

            Image.removeLink(obj, (err, res) => {
                expect(err).to.be.null;
                expect(res.ok).to.be.equal(1);

                expectArrLength(testImg, 'linkedBy', 0, () => {
                    done();
                });

            });
        });
    });

    it('should prevent adding of double likes', function(done) {
        let obj = {id: testImg._id, likedBy: 'tpoikela_user'};
        Image.addLike(obj, (err) => {
            expect(err).to.be.null;
            Image.addLike(obj, (err) => {
                expect(err).to.be.null;

                expectArrLength(testImg, 'likedBy', 1, () => {
                    done();
                });

            });
        });
    });

    it('should prevent adding of double-links', function(done) {
        let obj = {id: testImg._id, linkedBy: 'testUser'};
        Image.addLink(obj, (err) => {
            expect(err).to.be.null;
            Image.addLink(obj, (err) => {
                expect(err).to.be.null;

                expectArrLength(testImg, 'linkedBy', 1, () => {
                    done();
                });

            });
        });

    });

});
