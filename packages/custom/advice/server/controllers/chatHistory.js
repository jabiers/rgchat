'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ChatHistory = mongoose.model('ChatHistory'),
    _ = require('lodash');

/**
 * Create a goal
 */
exports.createChatHistory = function (req, res) {
    var chatHistory = new ChatHistory(req.body);

    chatHistory.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the ChatHistory'
            });
        }
        res.json(chatHistory);
    });
};


/**
 * List of goals
 */
exports.all = function (req, res) {

    var agentId = req.params.agentId;

    ChatHistory.find()
        .sort('created')
        .populate('chats')
        .exec(function (err, chatHistories) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the ChatHistories'
            });
        }
        res.json(chatHistories);
    });
};

/**
 * Destroy a goal
 */
exports.destroy = function (req, res) {
    var chatHistory = req.chatHistory;
    chatHistory.remove(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Cannot delete the ChatHistory'
            });
        }
        res.json(chatHistory);
    });
};

/**
 * Update an goal
 */
exports.update = function (req, res) {

    var chatHistory = req.chatHistory;
    chatHistory = _.extend(chatHistory, req.body);

    chatHistory.save(function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot update the ChatHistory'
            });
        }
        res.json(chatHistory);
    });
};

/**
 * Show a goal
 */
exports.show = function (req, res) {
    res.json(req.chatHistory);
};

/**
 * Find goal by id
 */
exports.chatHistory = function (req, res, next, id) {
    ChatHistory.load(id, function (err, chatHistory) {
        if (err) return next(err);
        if (!chatHistory) return next(new Error('Failed to load ChatHistory ' + id));
        req.chatHistory = chatHistory;
        next();
    });
};