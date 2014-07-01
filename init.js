/* jslint node: true */
"use strict";

var Bacon = require('baconjs').Bacon,
    rest = require('restler');

/** @type {String} The url from the API to setup. */
var apiUrl = 'http://localhost:8888/';

/**
 * Wipe all data from Employments
 */
(function () {
  var url = apiUrl.concat( 'pomodoro/delete' );

  var bacon = (function() {
    var request = rest.del( url );
    return Bacon.fromEventTarget(request, 'complete');
  }());

  bacon.onValue( function ( data ) {
    console.log('Pomodoro delete:');
    console.log( data );
    console.log('/////////////////////////////////////////////////');
  });
})();
