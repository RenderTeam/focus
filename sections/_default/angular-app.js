/* jslint node: true */
'use strict';
var di = require('di');
var angular = require('angular');
require('angular-resource');
require('angular-route');
require('angular-foundation');
require('foundation');

var app = angular.module('focus', [
      'mm.foundation',
      'ngRoute',
      'ngResource'
    ]);
app.config(function ($routeProvider) {
  $routeProvider.otherwise({redirectTo : '/view1'});
});

var uiModules = {
  angular   : [ 'value', angular ],
  app       : [ 'value', app ]
};
uiModules.uiModules = [ 'value', uiModules ];

var injector = new di.Injector([uiModules]);

/* modules browserify */
