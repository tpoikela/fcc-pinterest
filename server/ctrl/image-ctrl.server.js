'use strict';

const Image = require('../model/image-schema.js');
const User = require('../model/user-schema.js');

/* ImageController handles the DB access for adding/removing image related
 * information for users. */
class ImageController {

    constructor(path) {
        this.path = path;
    }

    /* Adds image to the database and for the user.*/
    addImage(username, body, cb) {
        var imgObj = {title: body.title, url: body.url,
            addedBy: body.userId};
        Image.createNew(imgObj, (err, img) => {
            if (err) {cb(err);}
            else {
                var imageId = img._id;
                var obj = {username: username, imageId: imageId};
                User.addImage(obj, (err, result) => {
                    if (err) {cb(err);}
                    else {cb(null, result);}
                });

            }
        });

    }

    getAllImages(cb) {
        Image.find({}, (err, data) => {
            if (err) {cb(err);}
            else {cb(null, data);}
        });
    }

}

module.exports = ImageController;
