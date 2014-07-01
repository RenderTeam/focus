/* jslint node: true */
'use strict';

module.exports = function ( params ) {
  var io = params.io,
      server = params.server;

  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });
};
