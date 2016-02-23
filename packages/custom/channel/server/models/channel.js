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
    hellomessage: {
        type: String,
        required: true,
        default: "상담 원하는 내용을 입력해주세요. 가능한한 빨리 답변 드리겠습니다."
    },
    nobodymessage: {
        type: String,
        required: true,
        default: "현재 접속중인 상담원이 없습니다."
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
        type: Array
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
    }).populate('operator')
        .populate('agents')
        .exec(cb);
};

mongoose.model('Channel', ChannelSchema);
