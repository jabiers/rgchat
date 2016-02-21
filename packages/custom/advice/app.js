'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Advice = new Module('advice');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Advice.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Advice.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Advice.menus.add({
    title: '상담현황',
    link: 'advice status',
    roles: ['operator', 'agent'],
    menu: 'topmenu'
  });

  Advice.aggregateAsset('css', 'advice.css');
  Advice.aggregateAsset('css', 'chatstyle.css');
  Advice.aggregateAsset('css', 'themes.css');
  Advice.aggregateAsset('css', 'panelStyle.css');
  Advice.aggregateAsset('css', 'style.css');
  Advice.aggregateAsset('css', '../lib/components-font-awesome/css/font-awesome.css');
  Advice.aggregateAsset('js', '../lib/lodash/lodash.js');
  Advice.aggregateAsset('js', '../lib/angular-socket-io/mock/socket-io.js');
  Advice.aggregateAsset('js', '../lib/angular-socket-io/socket.js');


  Advice.aggregateAsset('js', 'templates.js');
  Advice.aggregateAsset('js', 'index.js');
  Advice.angularDependencies(['rgchat.adviceClient', 'btford.socket-io']);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Advice.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Advice.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Advice.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Advice;
});
