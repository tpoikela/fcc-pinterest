'use strict';

const mongoose = require('mongoose');
const Validation = require('../common/validation.js');

let validator = new Validation();

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let UserSchema = new Schema({

    // Used to access the information in the database, unique for each
    username: {
        required: true,
        type: String,
        validate: {
            validator: validator.validateName,
            message: 'Name cannot contain < or >'
        }
    },

	// Used for twitter authentication
	twitter: {
		id: {type: String},
		token: {type: String},
		username: {type: String},
		displayName: {type: String}
	},

    // Used for local user and password auth
    local: {
        type: Object,
        username: {
            type: String
        },
        password: {
            type: String
        },
        validate: {
            validator: function(v) {
                return v.hasOwnProperty('username')
                    && v.hasOwnProperty('password');
            },
            message: 'username and password must exist.'
        }

    },

    linkedTo: [{type: ObjectId, ref: 'Image'}],
    liked: [{type: ObjectId, ref: 'Image'}],
    added: [{type: ObjectId, ref: 'Image'}]

},
{collection: 'pint_users'}
);


/* Convert args obj into a database query object.*/
function getQuery(obj) {
    if (obj.id) {
        return {_id: obj.id};
    }
    else if (obj.username) {
        return {username: obj.username};
    }
    else if (obj.query) {
        return obj.query;
    }
    console.error('Error. getQuery returning null.');
    return null;
}

/* Returns the object which is used to add given imageId to the user. */
function getPushObj(obj) {
    if (obj.add) {
        return {$addToSet: {added: obj.imageId}};
    }
    else if (obj.like) {
        return {$addToSet: {liked: obj.imageId}};
    }
    else if (obj.link) {
        return {$addToSet: {linkedTo: obj.imageId}};
    }
    else {
        // By default, add the imageId to 'owned' images
        return {$addToSet: {added: obj.imageId}};
    }
}

/* Returns the object which is used to remove given imageId from a user. */
function getPullObj(obj) {
    if (obj.add) {
        return {$pull: {added: obj.imageId}};
    }
    else if (obj.like) {
        return {$pull: {liked: obj.imageId}};
    }
    else if (obj.link) {
        return {$pull: {linkedTo: obj.imageId}};
    }
    else {
        // By default, add the imageId to 'owned' images
        return {$pull: {added: obj.imageId}};
    }

}

//---------------------------------------------------------------------------
// STATIC METHODS
//---------------------------------------------------------------------------

UserSchema.statics.findOrCreate = function(token, profile, cb) {
    let User = this.model('User');
	User.findOne({'twitter.id': profile.id}, (err, user) => {
		if (err) {cb(err);}
		else if (user) {
            console.log('Found existing user ' + user.username);
			cb(null, user); // user found, return that user
		}
		else {
            console.log('Creating a new user ' + profile.username);
			// if there is no user, create them
			let newUser = new User();

			// set all of the user data that we need
			newUser.twitter.id = profile.id;
			newUser.twitter.token = token;
			newUser.twitter.username = profile.username;
			newUser.twitter.displayName = profile.displayName;
			newUser.username = profile.username;

			// save our user into the database
			newUser.save(err => {
                console.log('User was saved OK');
				if (err) {
                    console.log('Error is ' + err);
                    cb(err);
                }
				else {
                    console.log('Callback with new user');
                    cb(null, newUser);
                }
			});
		}
	});
};

/* Returns the full document for given username. Doesn't populate. */
UserSchema.statics.getUser = function(username, cb) {
    let User = this.model('User');
    if (username) {
        User.findOne({username: username}, (err, data) => {
            if (err) {cb(err);}
            else if (data) {cb(null, data);}
            else {
                let error = new Error('No user |' + username + '| found.');
                cb(error);
            }
        });
    }
    else {
        let error = new Error('No username given.');
        cb(error);
    }
};

/* Calls given callback with user ID corresponding to the given username.*/
UserSchema.statics.getUserID = function(username, cb) {
    let User = this.model('User');
    User.findOne({username: username}, (err, data) => {
        if (err) {return cb(err);}
        if (data) {return cb(null, data._id);}

        let error = new Error('No user with given ID found.');
        return cb(error);
    });
};

/* Adds one image for this user. */
UserSchema.statics.addImage = function(obj, cb) {
    let User = this.model('User');
    let imageId = obj.imageId;
    if (imageId) {
        let query = getQuery(obj);
        let pushObj = getPushObj(obj);
        User.update(query, pushObj, (err, res) => {
            if (err) {cb(err);}
            else {
                cb(null, res);
            }
        });
    }
    else {
        let error = new Error('No imageId in obj');
        cb(error);
    }
};

/* Adds one image for this user. */
UserSchema.statics.removeImage = function(obj, cb) {
    let User = this.model('User');
    let imageId = obj.imageId;
    if (imageId) {
        let query = getQuery(obj);
        let pullObj = getPullObj(obj);
        User.update(query, pullObj, (err, res) => {
            if (err) {cb(err);}
            else {
                cb(null, res);
            }
        });
    }
    else {
        let error = new Error('No imageId in obj');
        cb(error);
    }
};

UserSchema.statics.addLinkedImage = function(obj, cb) {
    let User = this.model('User');
    let newObj = Object.assign({}, obj);
    newObj.link = true;
    User.addImage(newObj, cb);
};

UserSchema.statics.addLikedImage = function(obj, cb) {
    let User = this.model('User');
    let newObj = Object.assign({}, obj);
    newObj.like = true;
    User.addImage(newObj, cb);
};

UserSchema.statics.removeLinkedImage = function(obj, cb) {
    let User = this.model('User');
    let newObj = Object.assign({}, obj);
    newObj.link = true;
    User.removeImage(newObj, cb);
};

UserSchema.statics.removeLikedImage = function(obj, cb) {
    let User = this.model('User');
    let newObj = Object.assign({}, obj);
    newObj.like = true;
    User.removeImage(newObj, cb);
};

/* Returns all images for the given user. Does a populate. */
UserSchema.statics.getImagesForUser = function(obj, cb) {
    let User = this.model('User');
    let queryObj = getQuery(obj);
    let filter = {username: 1, added: 1, linkedTo: 1, liked: 1, _id: 0};
    User.findOne(queryObj, filter)
        .populate('added')
        .populate('liked')
        .populate('linkedTo')
        .exec( (err, user) => {
            if (err) {cb(err);}
            else {cb(null, user);}
        });
};

//---------------------------------------------------------------------------
// INSTANCE METHODS
//---------------------------------------------------------------------------

/* Updates the user info with given object. Note that obj must match the user
 * schema.*/
UserSchema.methods.update = function(obj, cb) {
    let setVals = {$set: obj};
    this.model('User').update({_id: this._id}, setVals, {}, (err, data) => {
        if (err) {cb(err, null);}
        cb(null, data);
    });
};

module.exports = mongoose.model('User', UserSchema);
