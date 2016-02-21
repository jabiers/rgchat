(function () {
  'use strict';

  /* jshint -W098 */
  angular
    .module('mean.customTheme')
    .controller('CustomThemeController', CustomThemeController);

  CustomThemeController.$inject = ['$scope', 'Global', 'CustomTheme'];

  function CustomThemeController($scope, Global, CustomTheme) {
    $scope.global = Global;
    $scope.package = {
      name: 'customTheme'
    };
  }
})();