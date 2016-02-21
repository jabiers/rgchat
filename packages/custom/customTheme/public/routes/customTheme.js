(function () {
  'use strict';

  angular
    .module('mean.customTheme')
    .config(customTheme);

  customTheme.$inject = ['$viewPathProvider', '$stateProvider'];

  function customTheme($viewPathProvider, $stateProvider) {
    $viewPathProvider.override('system/views/index.html', 'customTheme/views/index.html');
  }

})();
