(function () {
    'use strict';

    angular
        .module('mean.advice')
        .config(advice);

    advice.$inject = ['$stateProvider'];

    function advice($stateProvider) {
        $stateProvider
            .state('advice status', {
                url: '/advice',
                templateUrl: 'advice/views/index.html'
            });
    }
})();
