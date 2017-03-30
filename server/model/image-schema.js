
'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

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
        type: ObjectId,
        ref: 'User'
    },

    likedBy: [{type: ObjectId, ref: 'User'}],
    linkedBy: [{type: ObjectId, ref: 'User'}]

},
{collection: 'pint_images'}
);

module.exports = mongoose.model('Image', ImageSchema);
