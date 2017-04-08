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
        let imgObj = {title: body.title, url: body.url,
            addedBy: body.userId};
        Image.createNew(imgObj, (err, img) => {
            if (err) {cb(err);}
            else {
                let imageId = img._id;
                let obj = {username: username, imageId: imageId};
                User.addImage(obj, (err, result) => {
                    if (err) {cb(err);}
                    else {cb(null, result);}
                });

            }
        });

    }

    /* Updates existing images with link/like.*/
    updateImage(username, body, cb) {
        let imageId = body.image._id;
        if (imageId) {
            let obj = {
                id: imageId,
                linkedBy: username
            };
            if (body.link) {
                Image.addLink(obj, (err) => {
                    if (err) {cb(err);}
                    else {
                        let updateObj = {
                            username: username,
                            imageId: imageId
                        };
                        User.addLinkedImage(updateObj, (err, result) => {
                            if (err) {cb(err);}
                            else {
                                cb(null, result);
                            }
                        });
                    }
                });
            }
            else if (body.like) {
                let error = new Error('body.like not implemented yet');
                cb(error);
            }
            else {
                let error = new Error('body.link or body.like not given');
                cb(error);
            }
        }
        else {
            let error = new Error('image._id not found');
            cb(error);
        }
    }

    /* Removes linked image from a user.*/
    removeImage(username, body, cb) {
        let imageId = body.image._id;
        if (imageId) {
            let obj = {
                id: imageId,
                linkedBy: username
            };
            Image.removeLink(obj, (err, result) => {
                if (err) {cb(err);}
                else if (result.nModified === 1) {
                    let userObj = {};
                    User.removeLinkedImage(userObj, (err, result) => {
                        if (err) {cb(err);} // TODO handle link removal
                        else {
                            cb(null, result);
                        }

                    });
                }
                else {
                    let error = new Error('Error in Image.removeLink');
                    cb(error);
                }
            });
        }
        else {
            let error = new Error('image not found within body');
            cb(error);
        }
    }

    getAllImages(cb) {
        Image.find({}, (err, data) => {
            if (err) {cb(err);}
            else {cb(null, data);}
        });
    }

}

module.exports = ImageController;
