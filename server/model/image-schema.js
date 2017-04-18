
'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Schema.Types.ObjectId;

/* DB schema for storing images posted by users. Each image has an owner, an URL
 * and a title at least. Each images also knows which users have linked to it.*/
let ImageSchema = new Schema({

    url: {
        required: true,
        type: String
    },

    title: {
        required: true,
        type: String
    },

    likedBy: [{type: String, ref: 'User'}],
    linkedBy: [{type: String, ref: 'User'}]

},
{collection: 'pint_images'}
);

function verifyObj(obj, requiredKeys) {
    let ok = true;
    requiredKeys.forEach( (item) => {
        if (typeof obj[item] === 'undefined') {
            console.error('Image obj error. Missing key: ' + item);
            ok = false;
        }
    });
    return ok;
}

ImageSchema.statics.createNew = function(obj, cb) {
    const Image = this.model('Image');
    if (verifyObj(obj, ['title', 'url', 'linkedBy'])) {
        let img = new Image(obj);
        img.save( (err) => {
            if (err) {cb(err);}
            else {
                cb(null, img);
            }
        });
    }
    else {
        let error = new Error('Missing param');
        cb(error);
    }
};

ImageSchema.statics.addLike = function(obj, cb) {
    const Image = this.model('Image');
    if (verifyObj(obj, ['id', 'likedBy'])) {
        let id = obj.id;
        let userId = obj.likedBy;
        let query = {_id: id};
        let pushObj = {
            $addToSet: {likedBy: userId}
        };

        Image.update(query, pushObj, (err) => {
            if (err) {cb(err);}
            else {cb(null);}
        });
    }
};

/* Removes one like from the given image.*/
ImageSchema.statics.removeLike = function(obj, cb) {
    const Image = this.model('Image');
    let query = {_id: obj.id};
    let pullObj = {
        $pull: {likedBy: obj.likedBy}
    };

    Image.update(query, pullObj, (err, res) => {
        if (err) {cb(err);}
        else {cb(null, res);}
    });
};

/* Adds a link to the image. */
ImageSchema.statics.addLink = function(obj, cb) {
    const Image = this.model('Image');
    let id = obj.id;
    let userId = obj.linkedBy;
    let query = {_id: id};
    let pushObj = {
        $addToSet: {linkedBy: userId}
    };

    Image.update(query, pushObj, (err, res) => {
        if (err) {cb(err);}
        else {cb(null, res);}
    });

};

/* Removes a link from the image. */
ImageSchema.statics.removeLink = function(obj, cb) {
    const Image = this.model('Image');
    let id = obj.id;
    let userId = obj.linkedBy;
    let query = {_id: id};

    let pullObj = {
        $pull: {linkedBy: userId}
    };
    Image.update(query, pullObj, (err, res) => {
        if (err) {cb(err);}
        else {cb(null, res);}
    });
};

module.exports = mongoose.model('Image', ImageSchema);
