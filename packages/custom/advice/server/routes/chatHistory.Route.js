'use strict';
/* jshint -W098 */

// goal authorization helpers
var hasAuthorization = function (req, res, next) {
    if (!req.user.isAdmin && req.goal.user.id !== req.user.id) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

module.exports = function (ChatHistories, app, auth) {
    var chatHistories = require('../controllers/chatHistory.Controller')(ChatHistories);

    app.route('/api/ChatHistories').get(chatHistories.all);
    app.route('/api/ChatHistories').post(auth.requiresLogin, chatHistories.createChatHistory);
    app.route('/api/ChatHistories/:ChatHistoryId').get(auth.isMongoId, chatHistories.show);
    app.route('/api/ChatHistories/:ChatHistoryId').delete(auth.requiresLogin, chatHistories.destroy);
    app.route('/api/ChatHistories/:ChatHistoryId').put(auth.requiresLogin, chatHistories.update);

    // Finish with setting up the goalId param
    app.param('ChatHistoriesId', chatHistories.chatHistory);

};
