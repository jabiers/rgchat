var baseUrl = "http://rgchat.net:80/";
(function () {
    'use strict';

    angular
        .module('mean.advice')
        .factory('Advice', Advice);

    Advice.$inject = [];

    function Advice() {
        return {
            name: 'advice'
        };
    }

    angular
        .module('mean.advice')
        .factory('mySocket', function($rootScope) {
        	var socket = io.connect(baseUrl);
        	return {
        		on: function(eventName, callback) {
        			socket.on(eventName, function() {
        				var args = arguments;
        				$rootScope.$apply(function() {
        					callback.apply(socket, args);
        				});
        			});
        		},
        		emit: function(eventName, data, callback) {
        			socket.emit(eventName, data, function() {
        				console.log('event:', eventName);
        				var args = arguments;
        				$rootScope.$apply(function() {
        					if (callback) {
        						callback.apply(socket, args);
        					}
        				});
        			});
        		}
        	};
        });

    angular
        .module('mean.advice')
        .factory('Chat', ['$resource',
            function ($resource) {
                return $resource('api/chats/:chatId', {
                    chatId: '@_id'
                }, {
                    update: {
                        method: 'PUT'
                    }
                });
            }
        ])
        .factory('ChatHistory', ['$resource',
            function ($resource) {
                return $resource('api/ChatHistories/:chatHistoryId', {
                    chatHistoryId: '@_id'
                }, {
                    update: {
                        method: 'PUT'
                    }
                });
            }
        ]);
})();
