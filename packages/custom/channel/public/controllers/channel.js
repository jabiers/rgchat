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
            Channels.query(function(channels) {
                $scope.channels = channels;
            });
        };

        $scope.findOne = function() {
            Channels.get({
                channelId: $scope.channelId
            }, function(channel) {
                $scope.channel = channel;
            });
        };

        $scope.createOrUpdate = function (isValid) {
            if ($scope.channel && $scope.channel._id) {
                console.log('update');
                update(isValid);
            } else {
                console.log('create');
                create(isValid);
            }
        };

        $scope.onClickChannelRow = function(channel) {
            console.log(channel._id);
            Channels.get({
                channelId: channel._id
            }, function(channel) {
                console.log(channel);
                $scope.channel = channel;
            });
        }

        $scope.channelFormReset = function() {
            $scope.submitted = false;
            $scope.channel = undefined;
        }

        function create (isValid) {
            if (isValid) {
                var channel = new Channels($scope.channel);

                channel.$save(function (response) {
                    $scope.channel.channelname = "";
                    $scope.channel.url = "";
                    $scope.channel.agents = "";

                    console.log(response);
                    $scope.channels.push(response);
                    $scope.submitted = false;
                });

                $scope.channel = {};

            } else {
                $scope.submitted = true;
            }
        }

        function update (isValid) {
            if (isValid) {
                var channel = $scope.channel;
                if (!channel.updated) {
                    channel.updated = [];
                }

                channel.updated.push(new Date().getTime());

                channel.$update(function() {
                    // $location.path('articles/' + channel._id);
                    $scope.submitted = false;
                });
            } else {
                $scope.submitted = true;
            }
        }
    }
})();
