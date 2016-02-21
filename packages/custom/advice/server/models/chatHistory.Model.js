'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * Article Schema
 */
var ChatHistorySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    finished: {
        type: Date,
        default: Date.now
    },
    channel: {
        type: String,
        required: true,
        trim: true
    },
    clientid: {
        type: String,
        required: true
    },
    lastmessage: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    agent: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    chats:[{
        type: Schema.ObjectId,
        ref: 'Chat'
    }]
});

mongoose.model('ChatHistory', ChatHistorySchema);
