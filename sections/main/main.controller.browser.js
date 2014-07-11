/* jslint node: true */
'use strict';
var __ = require('underscore')._;

module.exports = function ( angular, app ) {
  app.controller( 'Main', main );
  main.$inject = [ '$scope', 'Socket'];
  function main ( scope, Socket) {
    scope.messages = [];
    scope.users = [];
    scope.tiempo = {
      time: 1,//convert to miliseconds
      run: false
    };
    scope.countdownattr: 100;
    Socket.on( 'new message', function ( data ) {
      scope.messages.push(data);
    });

    Socket.on( 'work now', function ( data ) {
      //Let's start the work
      var time = scope.tiempo.time*60*1000;//in miliseconds
      //Iniciar temporizador
      Socket.emit('start timer', time);
    });

    Socket.on( 'online users', function ( data ) {
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

    scope.workNow = function (){
      var userToWork = {
        username : scope.user.username
      };
      Socket.emit('to work', userToWork);
    };
  }
};
