'use strict';

/**
 * @ngdoc overview
 * @name mockupApp
 * @description
 * # mockupApp
 *
 * Main module of the application.
 */
angular
  .module('mockupApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'bardo.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/dashboard/rotation', {
        templateUrl: 'views/rotation.html',
        controller: 'RotationCtrl'
      })
      .when('/dashboard/summary', {
        templateUrl: 'views/summary.html',
        controller: 'SummaryCtrl'
      })
      .when('/badges', {
        templateUrl: 'views/badges.html',
        controller: 'BadgesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
