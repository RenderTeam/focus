/* jslint node: true */
/* globals io */
'use strict';
var $ = require('jquery');
var angular = require('angular');
var di = require('di');
var Foundation = require('foundation');

require('angular-resource');
require('angular-route');
require('angular-foundation');
require('angular-socket');
require('angular-timer');

var app = angular.module('focus', [
      'btford.socket-io',
      'mm.foundation',
      'ngRoute',
      'ngResource',
      'timer'
    ]);

app.config( config );

config.$inject = ['$routeProvider'];
function config ( routeProvider ) {
  routeProvider
    .otherwise(
      { redirectTo : '/'}
    );
}

var uiModules = {
  angular   : [ 'value', angular ],
  app       : [ 'value', app ],
  io        : [ 'value', io ]
};
uiModules.uiModules = [ 'value', uiModules ];

var injector = new di.Injector([uiModules]);

/* modules browserify */
