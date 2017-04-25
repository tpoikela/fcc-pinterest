'use strict';

const Image = require('../model/image-schema.js');
const User = require('../model/user-schema.js');

const blc = require('broken-link-checker');

const debug = require('debug')('image-ctrl');

/* ImageController handles the DB access for adding/removing image related
 * information for users. */
class ImageController {

    constructor(path) {
        this.path = path;
        this.isImageUrl = this.isImageUrl.bind(this);
    }

    log(msg, obj) {
        console.log('[ImageCtrl]: ' + msg);
        if (obj) {
            console.log('\t' + JSON.stringify(obj));

        }
    }

    isImageUrl(url) {
        if (url.match(/\.(jpg|jpeg|gif|png|bmp|svg)/) !== null) {
            return true;
        }
        return false;
    }

    /* Adds image to the database and for the user.*/
    addImage(username, body, cb) {
        let options = {};

		let urlChecker = new blc.UrlChecker(options, {
			link: (result) => {
                debug('Checking link ' + body.url);

                let isBroken = false;
				if (result.broken || result.excluded) {
                    isBroken = true;
                    console.error('ERROR. Broken link: ' + body.url);
                }
                else if (!this.isImageUrl(body.url)) {
                    isBroken = true;
                }

                let imgObj = {title: body.title, url: body.url,
                    linkedBy: username, broken: isBroken};

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

			},
			end: () => {
                debug('Finished checking broken URLs');
			}
		});

		urlChecker.enqueue(body.url);

    }

    /* Updates existing images with link/like.*/
    updateImage(username, body, cb) {
        let imageId = body.image._id;
        this.log('updateImage', {username: username, body: body});
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
                let obj = {
                    id: imageId,
                    likedBy: username
                };
                Image.addLike(obj, (err) => {
                    if (err) {cb(err);}
                    else {
                        let updateObj = {
                            username: username,
                            imageId: imageId
                        };
                        User.addLikedImage(updateObj, (err, result) => {
                            if (err) {cb(err);}
                            else {
                                cb(null, result);
                            }
                        });
                    }
                });
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

    /* Removes linked/liked image from a user.*/
    removeImage(username, body, cb) {
        let imageId = body.image._id;
        let obj = {id: imageId};
        this.log('removeImage', {obj: obj, body: body});

        if (imageId) {
            if (body.link === true) {
                obj.linkedBy = username;
                Image.removeLink(obj, (err, imgResult) => {
                    if (err) {cb(err);}
                    else {
                        let userObj = {imageId: imageId, username: username};
                        User.removeLinkedImage(userObj, (err, userResult) => {
                            if (err) {cb(err);}
                            else {
                                this.checkModResult(imgResult, userResult);
                                cb(null, userResult);
                            }
                        });
                    }
                });
            }
            else {
                obj.likedBy = username;
                Image.removeLike(obj, (err, imgResult) => {
                    if (err) {cb(err);}
                    else {
                        let userObj = {imageId: imageId, username: username};
                        User.removeLikedImage(userObj, (err, userResult) => {
                            if (err) {cb(err);}
                            else {
                                this.checkModResult(imgResult, userResult);
                                cb(null, userResult);
                            }
                        });
                    }
                });
            }
        }
        else {
            let error = new Error('image not found within body');
            cb(error);
        }
    }

    /* Returns all images from the database.*/
    getAllImages(cb) {
        Image.find({}, (err, data) => {
            if (err) {cb(err);}
            else {cb(null, data);}
        });
    }

    /* Checks that image/user documents were properly modified.*/
    checkModResult(imgRes, userRes) {
        if (imgRes.nModified === 1 && userRes.nModified === 0) {
            console.warn('Image modified, but User NOT modified');
        }
        else if (imgRes.nModified === 0 && userRes.nModified === 1) {
            console.warn('Image NOT modified, but User modified');
        }
    }

}

module.exports = ImageController;
