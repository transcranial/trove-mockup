'use strict';

/**
 * @ngdoc function
 * @name mockupApp.controller:BadgesCtrl
 * @description
 * # BadgesCtrl
 * Controller of the mockupApp
 */
var app = angular.module('mockupApp');

app.controller('BadgesCtrl', function ($scope, $location) {

    $scope.currentUser = { 'name': 'Leon Chen' };

    $scope.badges = [
        {
            'name': 'badge 1',
            'desc': '100 chest x-rays read',
            'url': 'test'
        },
        {
            'name': 'badge 2',
            'desc': '100 abdomen x-rays read',
            'url': 'test'
        }
    ];
    
});
