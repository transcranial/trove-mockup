'use strict';

/**
 * @ngdoc function
 * @name mockupApp.controller:RotationCtrl
 * @description
 * # RotationCtrl
 * Controller of the mockupApp
 */
var app = angular.module('mockupApp');

app.controller('RotationCtrl', function ($scope, $location, $window) {

    $scope.slickConfig = {
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 4,
        cssEase: 'ease-in-out',
        prevArrow: '<span class="prevButton"><i class="fa fa-chevron-left"></i></span>',
        nextArrow: '<span class="nextButton"><i class="fa fa-chevron-right"></i></span>'
    };

    $scope.slickHandle = {
    };

    $scope.data = {
        'name': 'Leon Chen',
        'rotations': [{"rotationName": "MSKCC Body CT", "rotationDate": "6/30/2014-7/6/2014"}, {"rotationName": "MSKCC Body CT", "rotationDate": "7/7/2014-7/13/2014"}, {"rotationName": "NYP Body US", "rotationDate": "7/14/2014-7/20/2014"}, {"rotationName": "NYP Body US", "rotationDate": "7/21/2014-7/27/2014"}, {"rotationName": "NYP GI-GU", "rotationDate": "7/28/2014-8/3/2014"}, {"rotationName": "NYP GI-GU", "rotationDate": "8/4/2014-8/10/2014"}, {"rotationName": "NYP GI-GU", "rotationDate": "8/11/2014-8/17/2014"}, {"rotationName": "NYP GI-GU", "rotationDate": "8/18/2014-8/24/2014"}, {"rotationName": "Peds", "rotationDate": "8/25/2014-8/31/2014"}, {"rotationName": "Vacation", "rotationDate": "9/1/2014-9/7/2014"}, {"rotationName": "Vacation", "rotationDate": "9/8/2014-9/14/2014"}, {"rotationName": "Peds", "rotationDate": "9/15/2014-9/21/2014"}, {"rotationName": "MSKCC Chest", "rotationDate": "9/22/2014-9/28/2014"}, {"rotationName": "MSKCC Chest", "rotationDate": "9/29/2014-10/5/2014"}, {"rotationName": "NYP Bone", "rotationDate": "10/6/2014-10/12/2014"}, {"rotationName": "NYP Bone", "rotationDate": "10/13/2014-10/19/2014"}, {"rotationName": "Neuro", "rotationDate": "10/20/2014-10/26/2014"}, {"rotationName": "Neuro", "rotationDate": "10/27/2014-11/2/2014"}, {"rotationName": "Neuro", "rotationDate": "11/3/2014-11/9/2014"}, {"rotationName": "Neuro", "rotationDate": "11/10/2014-11/16/2014"}, {"rotationName": "MSKCC Body CT", "rotationDate": "11/17/2014-11/23/2014"}, {"rotationName": "MSKCC Body CT", "rotationDate": "11/24/2014-11/30/2014"}, {"rotationName": "NYP Bone", "rotationDate": "12/1/2014-12/7/2014"}, {"rotationName": "NYP Bone", "rotationDate": "12/8/2014-12/14/2014"}, {"rotationName": "NYP Chest Inpt", "rotationDate": "12/15/2014-12/21/2014"}, {"rotationName": "NYP Chest Inpt", "rotationDate": "12/22/2014-12/28/2014"}, {"rotationName": "MSKCC GI-GU", "rotationDate": "12/29/2014-1/4/2015"}, {"rotationName": "MSKCC GI-GU", "rotationDate": "1/5/2015-1/11/2015"}, {"rotationName": "Nucs", "rotationDate": "1/12/2015-1/18/2015"}, {"rotationName": "Nucs", "rotationDate": "1/19/2015-1/25/2015"}, {"rotationName": "MSKCC GI-GU", "rotationDate": "1/26/2015-2/1/2015"}, {"rotationName": "MSKCC GI-GU", "rotationDate": "2/2/2015-2/8/2015"}, {"rotationName": "MSKCC Chest", "rotationDate": "2/9/2015-2/15/2015"}, {"rotationName": "MSKCC Chest", "rotationDate": "2/16/2015-2/22/2015"}, {"rotationName": "NYP Chest Inpt", "rotationDate": "2/23/2015-3/1/2015"}, {"rotationName": "NYP Chest Inpt", "rotationDate": "3/2/2015-3/8/2015"}, {"rotationName": "NYP Chest Inpt", "rotationDate": "3/9/2015-3/15/2015"}, {"rotationName": "Vacation", "rotationDate": "3/16/2015-3/22/2015"}, {"rotationName": "Vacation", "rotationDate": "3/23/2015-3/29/2015"}, {"rotationName": "Peds", "rotationDate": "3/30/2015-4/5/2015"}, {"rotationName": "NYP GI-GU", "rotationDate": "4/6/2015-4/12/2015"}, {"rotationName": "NYP GI-GU", "rotationDate": "4/13/2015-4/19/2015"}, {"rotationName": "NYP Bone", "rotationDate": "4/20/2015-4/26/2015"}, {"rotationName": "NYP Bone", "rotationDate": "4/27/2015-5/3/2015"}, {"rotationName": "NYP Chest Inpt", "rotationDate": "5/4/2015-5/10/2015"}, {"rotationName": "NYP Body CT", "rotationDate": "5/11/2015-5/17/2015"}, {"rotationName": "Nucs", "rotationDate": "5/18/2015-5/24/2015"}, {"rotationName": "Nucs", "rotationDate": "5/25/2015-5/31/2015"}, {"rotationName": "NYP Body CT", "rotationDate": "6/1/2015-6/7/2015"}, {"rotationName": "Neuro", "rotationDate": "6/8/2015-6/14/2015"}, {"rotationName": "MSKCC Chest", "rotationDate": "6/15/2015-6/21/2015"}, {"rotationName": "NYP Body US-CT", "rotationDate": "6/22/2015-6/28/2015"}],
        'studies': [
            {
                'id': 1,
                'modality': 'CT',
                'datetime': new Date(2014, 8, 3)
            }
        ]
    };

    var currentRotationIndex = -1;
    $scope.data.rotations.some(function (rotation, index) {
        var startDate = new Date(rotation.rotationDate.split('-')[0]);
        var endDate = new Date(rotation.rotationDate.split('-')[1]);
        var dateNow = new Date();
        if (dateNow >= startDate && dateNow < endDate) {
            currentRotationIndex = index;
            return true;
        } else {
            return false;
        }
    });
    $scope.visibleRotationIndex = currentRotationIndex;

    $scope.setVisibleRotation = function(index) {
        $scope.visibleRotationIndex = index;
    };

    
});
