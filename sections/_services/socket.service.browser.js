/* jslint node: true */
'use strict';

module.exports = function( app ) {
  app.factory( 'Socket', socket);

  socket.$inject = ['socketFactory'];
  function socket ( socketFactory ) {
    return socketFactory();
  }
};
