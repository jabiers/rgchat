(function () {
    'use strict';

    /* jshint -W098 */
    angular
        .module('mean.channel')
        .controller('ChannelController', ChannelController);

    ChannelController.$inject = ['$scope', 'Global', 'Channels'];

    function ChannelController($scope, Global, Channels) {
        $scope.global = Global;
        $scope.package = {
            name: 'channel'
        };

        $scope.find = function () {
            $scope.channels = [{
                _id: "aaa",
                url: "localhost",
                channelname: "name",
                agents: "agents",
                created: "today"
            }];
            Channels.query(function(channels) {
                $scope.channels = channels;
            });
        };

        $scope.hasAuthorization = function (channel) {
            if (!channel || !channel.user) return false;
            return MeanUser.isAdmin || channel.user._id === MeanUser.user._id;
        };

        $scope.create = function (isValid) {
            if (isValid) {
                var channel = new Channels($scope.channel);

                channel.$save(function (response) {
                    $scope.channel.channelname = "";
                    $scope.channel.url = "";
                    $scope.channel.agents = "";

                    console.log(response);
                    $scope.channels.push(response);
                });

                $scope.channel = {};

            } else {
                $scope.submitted = true;
            }
        };
        //$scope.availableCircles = [];
        //
        //Circles.mine(function (acl) {
        //    $scope.availableCircles = acl.allowed;
        //    $scope.allDescendants = acl.descendants;
        //});

        //$scope.showDescendants = function (permission) {
        //    var temp = $('.ui-select-container .btn-primary').text().split(' ');
        //    temp.shift(); //remove close icon
        //    var selected = temp.join(' ');
        //    $scope.descendants = $scope.allDescendants[selected];
        //};
        //
        //$scope.selectPermission = function () {
        //    $scope.descendants = [];
        //};
        //
        //$scope.create = function (isValid) {
        //    if (isValid) {
        //        // $scope.article.permissions.push('test test');
        //        var channel = new Channel($scope.channel);
        //
        //        channel.$save(function (response) {
        //            $location.path('channels/' + response._id);
        //        });
        //
        //        $scope.channel = {};
        //
        //    } else {
        //        $scope.submitted = true;
        //    }
        //};
        //
        //$scope.remove = function (channel) {
        //    if (channel) {
        //        channel.$remove(function (response) {
        //            for (var i in $scope.channels) {
        //                if ($scope.channels[i] === channel) {
        //                    $scope.channels.splice(i, 1);
        //                }
        //            }
        //            $location.path('channels');
        //        });
        //    } else {
        //        $scope.channel.$remove(function (response) {
        //            $location.path('channels');
        //        });
        //    }
        //};
        //
        //$scope.update = function (isValid) {
        //    if (isValid) {
        //        var channel = $scope.channel;
        //        if (!channel.updated) {
        //            channel.updated = [];
        //        }
        //        channel.updated.push(new Date().getTime());
        //
        //        channel.$update(function () {
        //            $location.path('channels/' + channel._id);
        //        });
        //    } else {
        //        $scope.submitted = true;
        //    }
        //};

        //$scope.find = function () {
        //    Channels.query(function (channels) {
        //        $scope.channels = channels;
        //    });
        //};
        //
        //$scope.findOne = function () {
        //    Channels.get({
        //        channelId: $stateParams.channelId
        //    }, function (channel) {
        //        $scope.channel = channel;
        //    });
        //};


    }
})();
//
// 'use strict';
//
// angular.module('mean.articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', 'MeanUser', 'Circles',
//   function($scope, $stateParams, $location, Global, Articles, MeanUser, Circles) {
//     $scope.global = Global;
//
//     $scope.hasAuthorization = function(article) {
//       if (!article || !article.user) return false;
//       return MeanUser.isAdmin || article.user._id === MeanUser.user._id;
//     };
//
//     $scope.availableCircles = [];
//
//     Circles.mine(function(acl) {
//         $scope.availableCircles = acl.allowed;
//         $scope.allDescendants = acl.descendants;
//     });
//
//     $scope.showDescendants = function(permission) {
//         var temp = $('.ui-select-container .btn-primary').text().split(' ');
//         temp.shift(); //remove close icon
//         var selected = temp.join(' ');
//         $scope.descendants = $scope.allDescendants[selected];
//     };
//
//     $scope.selectPermission = function() {
//         $scope.descendants = [];
//     };
//
//     $scope.create = function(isValid) {
//       if (isValid) {
//         // $scope.article.permissions.push('test test');
//         var article = new Articles($scope.article);
//
//         article.$save(function(response) {
//           $location.path('articles/' + response._id);
//         });
//
//         $scope.article = {};
//
//       } else {
//         $scope.submitted = true;
//       }
//     };
//
//     $scope.remove = function(article) {
//       if (article) {
//         article.$remove(function(response) {
//           for (var i in $scope.articles) {
//             if ($scope.articles[i] === article) {
//               $scope.articles.splice(i, 1);
//             }
//           }
//           $location.path('articles');
//         });
//       } else {
//         $scope.article.$remove(function(response) {
//           $location.path('articles');
//         });
//       }
//     };
//
//     $scope.update = function(isValid) {
//       if (isValid) {
//         var article = $scope.article;
//         if (!article.updated) {
//           article.updated = [];
//         }
//         article.updated.push(new Date().getTime());
//
//         article.$update(function() {
//           $location.path('articles/' + article._id);
//         });
//       } else {
//         $scope.submitted = true;
//       }
//     };
//
//     $scope.find = function() {
//       Articles.query(function(articles) {
//         $scope.articles = articles;
//       });
//     };
//
//     $scope.findOne = function() {
//       Articles.get({
//         articleId: $stateParams.articleId
//       }, function(article) {
//         $scope.article = article;
//       });
//     };
//   }
// ]);
