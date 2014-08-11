'use strict';

/**
 * @ngdoc function
 * @name mockupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mockupApp
 */
var app = angular.module('mockupApp');

app.controller('MainCtrl', function ($scope, $location) {

    $scope.test = 'pass';

    $scope.login = function() {
        $location.path('/dashboard');
    };
    
});
