'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Chat Schema
 */
var ChatSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    chathistoryid: {
        type: Schema.ObjectId,
        ref: 'ChatHistory'
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('Chat', ChatSchema);
