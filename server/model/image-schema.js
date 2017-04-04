
'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Schema.Types.ObjectId;

/* DB schema for storing images posted by users. Each image has an owner, an URL
 * and a title at least. Each images also knows which users have linked to it.*/
var ImageSchema = new Schema({

    url: {
        required: true,
        type: String
    },

    title: {
        required: true,
        type: String
    },

    addedBy: {
        required: true,
        type: String,
        ref: 'User'
    },

    likedBy: [{type: String, ref: 'User'}],
    linkedBy: [{type: String, ref: 'User'}]

},
{collection: 'pint_images'}
);

function verifyObj(obj, requiredKeys) {
    var ok = true;
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
    if (verifyObj(obj, ['title', 'url', 'addedBy'])) {
        var img = new Image(obj);
        img.save( (err) => {
            if (err) {cb(err);}
            else {
                cb(null, img);
            }
        });
    }
    else {
        var error = new Error('Missing param');
        cb(error);
    }
};

ImageSchema.statics.addLike = function(obj, cb) {
    const Image = this.model('Image');
    if (verifyObj(obj, ['id', 'likedBy'])) {
        var id = obj.id;
        var userId = obj.likedBy;
        var query = {_id: id};
        var pushObj = {
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
    var query = {_id: obj.id};
    var pullObj = {
        $pull: {likedBy: obj.userId}
    };

    Image.update(query, pullObj, (err, res) => {
        if (err) {cb(err);}
        else {cb(null, res);}
    });
};


ImageSchema.statics.addLink = function(obj, cb) {
    const Image = this.model('Image');
    var id = obj.id;
    var userId = obj.linkedBy;
    var query = {_id: id};
    var pushObj = {
        $addToSet: {linkedBy: userId}
    };

    Image.update(query, pushObj, (err, res) => {
        if (err) {cb(err);}
        else {cb(null, res);}
    });

};

ImageSchema.statics.removeLink = function(obj, cb) {
    const Image = this.model('Image');
    var id = obj.id;
    var userId = obj.linkedBy;
    var query = {_id: id};

    var pullObj = {
        $pull: {linkedBy: userId}
    };
    Image.update(query, pullObj, (err, res) => {
        if (err) {cb(err);}
        else {cb(null, res);}
    });
};

module.exports = mongoose.model('Image', ImageSchema);
