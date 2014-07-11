/* jslint node: true */
'use strict';

module.exports = function ( params ) {
  var io = params.io,
      server = params.server,
      users = [],
      usersToWork = [];

  io.on('connection', function ( socket ) {

    socket.on('start timer', function(time){
      var message = {
            username: 'system',
            date: new Date(),
            message: "Tiempo establecido a " + time/60/1000,
            type: 'label [success alert secondary]'
          };
      socket.emit('new message', message);
      socket.broadcast.emit('new message', message);
      setTimeout( function () {
          var message = {
            username: 'system',
            date: new Date(),
            message: "Time!",
            type: 'label [success alert secondary]'
          };
          socket.emit('new message', message);
          socket.broadcast.emit('new message', message);
        }, time);
    });

    socket.on('send message', function ( data ) {
      socket.broadcast.emit('new message', data);
      socket.emit('new message', data);
    });

    socket.on('remove user', function ( data ) {
      var message = {
        username: 'system',
        date: new Date(),
        message: data.username + "is offline!",
        type: 'label'
      };
      socket.broadcast.emit('new message', message);
      var index = users.indexOf(data);
      if (index > -1) {
          users.splice(index, 1);
      }
    });

    socket.on('add user', function ( data ) {
      users.push(data);
      var message = {
        username: 'system',
        date: new Date(),
        message: data.username + "is on!.",
        type: 'label'
      };
      socket.broadcast.emit('new message', message);
      socket.emit('online users', users);
    });

    socket.on('to work', function (user){
      usersToWork.push(user);
      console.log(usersToWork.length >= users.length);
      if(usersToWork.length >= users.length){
        socket.emit('work now', usersToWork.length);
      }
    });

  });
};
