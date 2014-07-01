/* jslint node: true */
'use strict';
var __ = require('underscore')._;

module.exports = function ( angular, app ) {
  app.controller( 'Main', main );

  main.$inject = [ '$scope', 'Socket' ];
  function main ( scope, Socket ) {
    scope.messages = [];

    Socket.on( 'new message', function ( data ) {
      console.log(data);
      scope.messages.push(data);
    });


    scope.sendMessage = function () {
      var params = {
        username: 'Username',
        date: new Date(),
        message: scope.message
      };

      Socket.emit( 'send message', params );
    };
  }
};
