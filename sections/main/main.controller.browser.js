/* jslint node: true */
'use strict';
var __ = require('underscore')._;

module.exports = function ( angular, app ) {
  app.controller( 'Main', main );

  main.$inject = [ '$scope', 'Socket' ];
  function main ( scope, Socket ) {
    scope.messages = [];
    scope.users = [];

    Socket.on( 'new message', function ( data ) {
      scope.messages.push(data);
    });

    Socket.on( 'new user', function ( data ) {
      scope.messages.push(data);
    });

    Socket.on( 'remove user', function ( data ) {
      scope.messages.push(data);
    });

    Socket.on( 'online users', function ( data ) {
      console.log(data.length);
      var message = {
        username: '',
        date: '',
        message: "Hay " + data.length + " conectados.",
        type: 'label [round radius]'
      };
      scope.messages.push(message);
      scope.users = data;
    });

    scope.addUser = function () {
      var usernames = __.pluck(scope.users, 'username');
      if(scope.user.username && !__.contains(usernames, scope.user.username)){
        var user = {
          username : scope.user.username,
          status : true
        };
        Socket.emit( 'add user', user);
      }
    };

    scope.removeUser = function () {
      var usernames = __.pluck(scope.users, 'username');
      if(scope.user.username && !__.contains(usernames, scope.user.username)){
        var user = {
          username : scope.user.username,
          status : false
        };
        Socket.emit( 'remove user', user);
      }
    };

    scope.sendMessage = function () {
      var params = {
        username: scope.user.username,
        date: new Date(),
        message: scope.message,
        type: 'normal'
      };
      Socket.emit( 'send message', params );
    };
  }
};
