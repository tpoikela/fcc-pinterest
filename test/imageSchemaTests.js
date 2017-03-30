

const expect = require('chai').expect;
const Utils = require('./test-utils');
const Image = require('../server/model/image-schema.js');

const getObjectId = Utils.getObjectId;

describe('Image-model', function() {

    it('should have name, url and owner', function() {
        var img = new Image();
        img.url = 'http://nonsense.com/test.png';
        var errors = img.validateSync();
        expect(errors.title).to.exist;
        expect(errors.url).to.not.exist;
        expect(errors.addedBy).to.exist;
    });
});
