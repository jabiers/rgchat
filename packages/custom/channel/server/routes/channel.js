(function () {
  'use strict';

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && !req.channel.user._id.equals(req.user._id)) {
      return res.status(401).send('User is not authorized');
    }
    next();
  };

  var hasPermissions = function(req, res, next) {

      req.body.permissions = req.body.permissions || ['operator'];

      for (var i = 0; i < req.body.permissions.length; i++) {
        var permission = req.body.permissions[i];
        if (req.acl.user.allowed.indexOf(permission) === -1) {
              return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
          }
      }

      next();
  };

  module.exports = function (Channels, app, auth, database) {

    var channels = require('../controllers/channel')(Channels);

    app.route('/api/channels')
      .get(channels.all)
      .post(auth.requiresLogin, hasPermissions, channels.create);
    app.route('/api/channels/:channelId')
      .get(auth.isMongoId, channels.show)
      .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, channels.update)
      .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, channels.destroy);

    // Finish with setting up the articleId param
    app.param('channelId', channels.channel);
    // 
    // app.get('/api/channel/example/anyone', function (req, res, next) {
    //   res.send('Anyone can access this');
    // });
    //
    // app.get('/api/channel/example/auth', auth.requiresLogin, function (req, res, next) {
    //   res.send('Only authenticated users can access this');
    // });
    //
    // app.get('/api/channel/example/admin', auth.requiresAdmin, function (req, res, next) {
    //   res.send('Only users with Admin role can access this');
    // });
    //
    // app.get('/api/channel/example/render', function (req, res, next) {
    //   Channel.render('index', {
    //     package: 'channel'
    //   }, function (err, html) {
    //     //Rendering a view from the Package server/views
    //     res.send(html);
    //   });
    // });
  };
})();
