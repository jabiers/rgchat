(function () {
  'use strict';

  angular
    .module('mean.channel')
    .factory('Channels', Channels);

  Channels.$inject = ['$resource'];

  function Channels($resource) {
    return $resource('api/channels/:channelId', {
      channelId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  };
})();
