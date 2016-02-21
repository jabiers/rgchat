(function () {
  'use strict';

  angular
    .module('mean.customTheme')
    .factory('CustomTheme', CustomTheme);

  CustomTheme.$inject = [];

  function CustomTheme() {
    return {
      name: 'customTheme'
    };
  }
})();
