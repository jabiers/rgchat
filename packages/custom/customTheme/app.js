'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var CustomTheme = new Module('customTheme');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
CustomTheme.register(function(app, auth, database, system) {

  //We enable routing. By default the Package Object is passed to the routes

  CustomTheme.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  CustomTheme.menus.add({
    title: 'customTheme example page',
    link: 'customTheme example page',
    roles: ['authenticated'],
    menu: 'main'
  });

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  CustomTheme.aggregateAsset('css', 'customTheme.css');
  CustomTheme.angularDependencies(['mean.system']);

  return CustomTheme;
});
