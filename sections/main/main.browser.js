/* jslint node: true */
'use strict';

module.exports = function ( app ) {
  app.config( config );

  config.$inject = ['$routeProvider'];
  function config ( routeProvider ) {
    routeProvider
      .when( '/', {
        controller: 'Main',
        templateUrl : '/html/main/main.html'
      }).when( '/hola', {
        controller: 'Main',
        templateUrl : '/html/main/partials/graphics.html'
      });
  }
};
