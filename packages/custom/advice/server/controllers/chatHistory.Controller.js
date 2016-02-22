'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
ChatHistory = mongoose.model('ChatHistory'),
_ = require('lodash');


module.exports = function (ChatHistories) {
    return {
        createChatHistory : function (req, res) {
            var chatHistory = new ChatHistory(req.body);

            chatHistory.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the ChatHistory'
                    });
                }
                res.json(chatHistory);
            });
        },
        all : function (req, res) {

            var agentId = req.user;

            ChatHistory.find({agents: user})
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
        },
        destroy : function (req, res) {
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
        },
        update : function (req, res) {

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
        },
        show : function (req, res) {
            res.json(req.chatHistory);
        },
        chatHistory: function (req, res, next, id) {
            ChatHistory.load(id, function (err, chatHistory) {
                if (err) return next(err);
                if (!chatHistory) return next(new Error('Failed to load ChatHistory ' + id));
                req.chatHistory = chatHistory;
                next();
            });
        }
    }
}
