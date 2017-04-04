

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

var testUrl = 'http://nonsense.com/test.png';

describe('Image-model', function() {

    var testImg = null;

    beforeEach( (done) => {
        testImg = new Image({
            title: 'xxx',
            url: 'http://yyy.com/img.png',
            addedBy: getObjectId()
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
        var img = new Image();
        img.url = testUrl;
        var errors = img.validateSync().errors;

        expect(errors.title).to.exist;
        expect(errors.url).to.not.exist;
        expect(errors.addedBy).to.exist;
    });

    it('should be saved properly to DB', function(done) {
        var obj = {
            addedBy: getObjectId(),
            url: testUrl,
            title: 'A test image for the user'
        };

        Image.createNew(obj, (err, img) => {
            expect(err).to.be.null;
            expect(img._id).to.exist;
            done();
        });

    });

    it('can have likes added to it', function(done) {
        var obj = {id: testImg._id, likedBy: getObjectId()};
        Image.addLike(obj, (err) => {
            expect(err).to.be.null;
            Image.findOne({_id: testImg._id}, (err, img) => {
                expect(err).to.be.null;
                if (!img) {
                    console.log('No image with ID ' + testImg._id);
                }
                else {
                    expect(img.likedBy).to.have.length(1);
                    done();
                }
            });

        });
    });

    it('can have links added to it', function(done) {
        var obj = {id: testImg._id, linkedBy: getObjectId()};
        Image.addLink(obj, (err) => {
            expect(err).to.be.null;
            Image.findOne({_id: testImg._id}, (err, img) => {
                expect(err).to.be.null;
                if (!img) {
                    console.log('No image with ID ' + testImg._id);
                }
                else {
                    expect(img.linkedBy).to.have.length(1);
                    done();
                }
            });

        });
    });


    it('can have likes removed from it', function(done) {
        var obj = {id: testImg._id, likedBy: getObjectId()};
        Image.addLike(obj, (err) => {

            expect(err).to.be.null;
            obj.userId = obj.likedBy;

            Image.removeLike(obj, (err, res) => {
                expect(err).to.be.null;
                expect(res.ok).to.be.equal(1);

                Image.findOne({_id: testImg._id}, (err, img) => {
                    expect(err).to.be.null;
                    expect(img.likedBy).to.have.length(0);
                    done();
                });

            });
        });
    });

    it('can have links removed from it', function(done) {
        var obj = {id: testImg._id, linkedBy: getObjectId()};
        Image.addLink(obj, (err) => {
            expect(err).to.be.null;

            obj.userId = obj.linkedBy;

            Image.removeLink(obj, (err, res) => {
                expect(err).to.be.null;
                expect(res.ok).to.be.equal(1);

                Image.findOne({_id: testImg._id}, (err, img) => {
                    expect(err).to.be.null;
                    expect(img.linkedBy).to.have.length(0);
                    done();
                });

            });
        });
    });

});
