'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Channel = new Module('channel');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Channel.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Channel.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Channel.menus.add({
        title: '채널',
        link: 'channel',
        roles: ['operator'],
        menu: 'topmenu'
    });

    Channel.aggregateAsset('css', 'channel.css');

    /**
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Channel.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Channel.settings({
        'anotherSettings': 'some value'
    });

     // Get settings. Retrieves latest saved settigns
     Channel.settings(function(err, settings) {
        //you now have the settings object
    });
     */

    return Channel;
});
