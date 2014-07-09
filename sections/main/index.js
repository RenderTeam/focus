/* jslint node: true */
'use strict';

module.exports = function ( params ) {
  var io = params.io,
      server = params.server,
      users = [];

  io.on('connection', function ( socket ) {
    console.log('Conexion');

    socket.on('send message', function ( data ) {
      console.log(data);
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
      socket.broadcast.emit('remove user', message);
      var index = users.indexOf(data);
      if (index > -1) {
          users.splice(index, 1);
      }
    });

    socket.on('add user', function ( data ) {
      console.log(data);
      users.push(data);
      var message = {
        username: 'system',
        date: new Date(),
        message: data.username + "is on!.",
        type: 'label'
      };
      socket.broadcast.emit('new user', message);
      socket.emit('online users', users);
    });
  });
};
