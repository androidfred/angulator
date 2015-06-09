'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('angulator'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should have preset directions', inject(function($controller) {
    expect(scope.directions).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });

    var directions = [
      {name:'LONG'},
      {name:'SHORT'}
    ];

    expect(scope.directions).toEqual(directions);
  }));

  it('should have a preset position', inject(function($controller) {
    expect(scope.input).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });

    var input = {
      capital: 10000,
      tolerableRiskInPercentOfCapitalPerTrade: 2,
      direction: {name:'LONG'},
      pricePerUnit: 25,
      stopLossPricePerUnit: 24
    };

    expect(scope.input).toEqual(input);
  }));

  it('should not initially have error', inject(function($controller) {

    $controller('MainCtrl', {
      $scope: scope
    });

    expect(scope.error).toBeUndefined();
  }));

  it('should not initially display result', inject(function($controller) {

    $controller('MainCtrl', {
      $scope: scope
    });

    expect(scope.resultVisible()).toBeFalsy();
  }));

  it('should set position to calculated result', inject(function($controller) {

    var MainService = {
      calculate: function(capital, tolerableRiskInPercentOfCapitalPerTrade, direction, pricePerUnit, stopLossPricePerUnit) {
      }
    };

    var result = {
      unitsToBuy: 200,
      total: 5000,
      totalTolerableRiskPerTrade: 200,
      stopLossPerUnitLoss: 1,
      stopLossTotalLoss: 200
    };

    spyOn(MainService, "calculate").and.returnValue(result);

    $controller('MainCtrl', {
      $scope: scope,
      MainService: MainService
    });

    expect(scope.resultVisible()).toBeFalsy();

    var input = {
      capital: 10000,
      tolerableRiskInPercentOfCapitalPerTrade: 2,
      direction: {name:'LONG'},
      pricePerUnit: 25,
      stopLossPricePerUnit: 24
    };

    scope.calculate(input);

    expect(MainService.calculate).toHaveBeenCalled();
    expect(scope.position).toEqual(result);
    expect(scope.error).toBeNull();
    expect(scope.resultVisible()).toBeTruthy();

  }));

  it('should display error', inject(function($controller) {

    var MainService = {
      calculate: function(capital, tolerableRiskInPercentOfCapitalPerTrade, direction, pricePerUnit, stopLossPricePerUnit) {
      }
    };

    var typeError = new TypeError('stop loss price per unit must be higher than price per unit when short');

    spyOn(MainService, "calculate").and.throwError(typeError);

    $controller('MainCtrl', {
      $scope: scope,
      MainService: MainService
    });

    expect(scope.resultVisible()).toBeFalsy();

    var input = {
      capital: 10000,
      tolerableRiskInPercentOfCapitalPerTrade: 2,
      direction: {name:'LONG'},
      pricePerUnit: 25,
      stopLossPricePerUnit: 24
    };

    scope.calculate(input);

    expect(MainService.calculate).toHaveBeenCalled();
    expect(scope.error).toEqual(typeError.message);
    expect(scope.resultVisible()).toBeFalsy();

  }));

});
