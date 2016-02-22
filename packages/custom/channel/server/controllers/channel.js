'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Channel = mongoose.model('Channel'),
config = require('meanio').loadConfig(),
_ = require('lodash');

module.exports = function (Channels) {

    return {
        channel: function(req, res, next, id) {
            Channel.load(id, function(err, channel) {
                if (err) return next(err);
                if (!channel) return next(new Error('Failed to load channel ' + id));
                req.channel = channel;
                next();
            });
        },
        all: function (req, res) {
            Channel.find({operator: req.user._id})
            .sort('-created')
            .populate('agents')
            .exec(function (err, channel) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the channel'
                    });
                }

                res.json(channel);
            });
        },
        show: function (req, res) {
            Channels.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.channel.channelname,
                url: config.hostname + '/channels/' + req.channel._id
            });

            res.json(req.channel);

        },
        create: function (req, res) {
            var channel = new Channel(req.body);
            channel.operator = req.user;

            channel.save(function (err) {
                if (err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot save the channel'
                        });
                    }
                }

                res.json(channel);
            });
        },
        /**
        * Update an article
        */
        update: function(req, res) {
            var channel = req.channel;

            channel = _.extend(channel, req.body);

            channel.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the channel'
                    });
                }

                res.json(channel);
            });
        },
        /**
        * Delete an article
        */
        destroy: function(req, res) {
            var channel = req.channel;

            channel.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the channel'
                    });
                }

                res.json(channel);
            });
        }
    };
}
