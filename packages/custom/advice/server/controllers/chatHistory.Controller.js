
var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat'),
    config = require('meanio').loadConfig(),
    ChatHistory = mongoose.model('ChatHistory');

module.exports = function (ChatHistories) {

    return {
        /**
         * Find article by id
         */
        chatHistory: function (chathistoryid, next) {
            ChatHistory.findById(chathistoryid, next);
        },
        /**
         * Create an chatHistory
         */
        create: function (data, next) {
            var chatHistory = new ChatHistory(data);
            chatHistory.save(next);
        },

        addChat: function (data, next) {
            var chat = new Chat(data);
            chat.save(function (err) {
                console.log(chat);
                if (err) console.log(err);
                ChatHistory.findByIdAndUpdate(
                    chat.chathistoryid,
                    {$push: {chats: chat._id}, $set: {lastmessage: chat.message}},
                    {'new': true, 'multi': true},
                    function(){}
                );

                next(err, chat);
            });
        },

        finishChat: function (chathistoryid, next) {
            ChatHistory.findByIdAndUpdate(
                chathistoryid,
                {$set: {finished: Date.now()}},
                {'new': true},
                next
            );
        }
        ///**
        // * Update an article
        // */
        //update: function(req, res) {
        //    var article = req.article;
        //
        //    article = _.extend(article, req.body);
        //
        //
        //    article.save(function(err) {
        //        if (err) {
        //            return res.status(500).json({
        //                error: 'Cannot update the article'
        //            });
        //        }
        //
        //        Articles.events.publish({
        //            action: 'updated',
        //            user: {
        //                name: req.user.name
        //            },
        //            name: article.title,
        //            url: config.hostname + '/articles/' + article._id
        //        });
        //
        //        res.json(article);
        //    });
        //},
        ///**
        // * Delete an article
        // */
        //destroy: function(req, res) {
        //    var article = req.article;
        //
        //
        //    article.remove(function(err) {
        //        if (err) {
        //            return res.status(500).json({
        //                error: 'Cannot delete the article'
        //            });
        //        }
        //
        //        Articles.events.publish({
        //            action: 'deleted',
        //            user: {
        //                name: req.user.name
        //            },
        //            name: article.title
        //        });
        //
        //        res.json(article);
        //    });
        //},
        ///**
        // * Show an article
        // */
        //show: function(req, res) {
        //
        //    Articles.events.publish({
        //        action: 'viewed',
        //        user: {
        //            name: req.user.name
        //        },
        //        name: req.article.title,
        //        url: config.hostname + '/articles/' + req.article._id
        //    });
        //
        //    res.json(req.article);
        //},
        ///**
        // * List of Articles
        // */
        //all: function(req, res) {
        //    var query = req.acl.query('Article');
        //
        //    query.find({}).sort('-created').populate('user', 'name username').exec(function(err, articles) {
        //        if (err) {
        //            return res.status(500).json({
        //                error: 'Cannot list the articles'
        //            });
        //        }
        //
        //        res.json(articles)
        //    });
        //
        //}
    };
}();