/* jslint node: true */
'use strict';

module.exports = function ( params ) {
  var io = params.io,
      server = params.server;

  io.on('connection', function ( socket ) {
    console.log('Conexion');
    socket.on('send message', function ( data ) {
      console.log(data);
      socket.broadcast.emit('new message', data);
    });
  });
};
