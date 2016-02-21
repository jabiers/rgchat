var mongoose = require('mongoose'),
    Chat = mongoose.model('Chat'),
    ChatHistory = mongoose.model('ChatHistory');

module.exports = function () {

    return {
        getChatHistoryByChannelId: function (req, res) {
            ChatHistory.find({channel: req.params.channel})
                .populate('chats')
                .exec(function (err, chatHistory) {
                    res.json(chatHistory);
                });
        },
        getChatHistoryByClientId: function (req, res) {
            ChatHistory.find({clientid: req.params.clientId})
                .populate('chats')
                .exec(function (err, chatHistory) {
                    res.json(chatHistory);
                });
        },
        getChatHistoryById: function (req, res) {
            ChatHistory.find({_id: req.params.id})
                .populate('chats')
                .exec(function (err, chatHistory) {
                    res.json(chatHistory);
                });
        },
        getChatHistoryByAgentId: function (req, res) {

            // 나중에는 해당 agent 가 속한 히스토리만 가져와야함
            var agentId = req.params.agentId;
            ChatHistory.find({})
                .sort({created: -1})
                .populate('chats')
                .exec(function (err, chatHistory) {
                    res.json(chatHistory);
                });

        }

    };
}();