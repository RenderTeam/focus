/* jslint node: true */
'use strict';
var __ = require('underscore')._;

module.exports = function ( angular, app ) {
  app.controller( 'Main', main );

  main.$inject = [ '$scope', 'Socket' ];
  function main ( scope, Socket ) {
    Socket.on( 'news', function ( data ) {
      console.log(data);
    });
  }
};
