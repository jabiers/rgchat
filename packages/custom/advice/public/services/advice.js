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
        .factory('mySocket', function (socketFactory) {
            return socketFactory();
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
    ;
})();
