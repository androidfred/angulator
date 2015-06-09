'use strict';

angular.module('angulator')
  .controller('MainCtrl', function ($scope, $location, $anchorScroll, MainService) {
    $scope.directions = [
      {name:'LONG'},
      {name:'SHORT'}
    ];

    $scope.input = {
      capital: 10000,
      tolerableRiskInPercentOfCapitalPerTrade: 2,
      direction: $scope.directions[0],
      pricePerUnit: 25,
      stopLossPricePerUnit: 24
    };

    $scope.calculate = function (input) {
      try {
        $scope.position = MainService.calculate(
          input.capital,
          input.tolerableRiskInPercentOfCapitalPerTrade,
          input.direction.name,
          input.pricePerUnit,
          input.stopLossPricePerUnit
        );
        $scope.error = null;
      } catch (error) {
        $scope.error = error.message;
      }
      $location.hash('feedback');
      $anchorScroll();
    };

    $scope.resultVisible = function(){
      return !$scope.error && $scope.position;
    };

  });
