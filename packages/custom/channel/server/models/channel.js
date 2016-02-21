'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ChannelSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    channelname: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    operator: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    agents: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    updated: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
ChannelSchema.path('channelname').validate(function (channelname) {
    return !!channelname;
}, 'channelname cannot be blank');

ChannelSchema.path('url').validate(function (url) {
    return !!url;
}, 'url cannot be blank');

/**
 * Statics
 */
ChannelSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('operator', 'agents').exec(cb);
};

mongoose.model('Channel', ChannelSchema);
