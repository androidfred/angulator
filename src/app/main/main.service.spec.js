'use strict';

describe('services', function(){

  beforeEach(module('angulator'));

  it('should not accept falsey number arguments', inject(function(MainService){
    var fn = function(){
      MainService.calculate(undefined,undefined,'long',undefined,undefined

      );
    };
    expect(fn).toThrowError(TypeError, 'All numbers must have positive signum');
  }));

  it('should not accept falsey direction argument', inject(function(MainService){
    var fn = function(){
      MainService.calculate(10000, 2, undefined, 25, 24);
    };
    expect(fn).toThrowError(TypeError, 'direction must not be falsey');
  }));

  it('should not accept zero arguments', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        0, 0, 'LONG', 0, 0
      );
    };
    expect(fn).toThrowError(TypeError, 'All numbers must have positive signum');
  }));

  it('should not accept negative arguments', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        -1, -1, 'LONG', -1, -1
      );
    };
    expect(fn).toThrowError(TypeError, 'All numbers must have positive signum');
  }));

  it('should require tolerable risk in percent of capital per trade to be less than 100', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        10000, 100, 'LONG', 25, 24
      );
    };
    expect(fn).toThrowError(TypeError, 'Tolerable risk in percent of capital per trade must be less than 100');
  }));

  it('should not accept direction to be a number', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        10000, 2, 0, 25, 24
      );
    };
    expect(fn).toThrowError(TypeError, 'direction must not be falsey');
  }));

  it('should not accept direction to be null', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        10000, 2, null, 25, 24
      );
    };
    expect(fn).toThrowError(TypeError, 'direction must not be falsey');
  }));

  it('should not accept direction to be any other string than long or short', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        10000, 2, 'blah', 25, 24
      );
    };
    expect(fn).toThrowError(TypeError, 'direction must be either long or short');
  }));

  it('should require stop loss price to be lower than price when long', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        10000, 2, 'long', 25, 25
      );
    };
    expect(fn).toThrowError(TypeError, 'Stop loss price per unit must be lower than price per unit when long');
  }));

  it('should require stop loss price to be higher than price when short', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        10000, 2, 'short', 25, 25
      );
    };
    expect(fn).toThrowError(TypeError, 'Stop loss price per unit must be higher than price per unit when short');
  }));

  it('should calculate long position with whole numbers', inject(function(MainService){
    var result = MainService.calculate(
      10000, 2, 'LONG', 25, 24
    );
    expect(result.getUnitsToBuy()).toEqual(200);
  }));

  it('should calculate long position with decimals', inject(function(MainService){
    var result = MainService.calculate(
      9999, 2, 'LONG', 19.5, 17.3
    );
    expect(result.getUnitsToBuy()).toEqual(90);
  }));

  it('should calculate short position with whole numbers', inject(function(MainService){
    var result = MainService.calculate(
      10000, 2, 'SHORT', 24, 25
    );
    expect(result.getUnitsToBuy()).toEqual(200);
  }));

  it('should calculate short position with decimals', inject(function(MainService){
    var result = MainService.calculate(
      9999, 2, 'SHORT', 17.3, 19.5
    );
    expect(result.getUnitsToBuy()).toEqual(90);
  }));

  it('should require capital to be higher than total', inject(function(MainService){
    var result = MainService.calculate(
      10000, 2, 'LONG', 1000000, 999999
    );
    expect(result.getUnitsToBuy()).toEqual(0);
  }));

  it('should return tolerable risk per trade', inject(function(MainService){
    var result = MainService.calculate(
      10000, 2, 'LONG', 25, 24
    );
    expect(result.getTotalTolerableRiskPerTrade()).toEqual('200.00');
  }));

  it('should return total stop loss', inject(function(MainService){
    var result = MainService.calculate(
      10000, 2, 'LONG', 25, 24
    );
    expect(result.getStopLossTotalLoss()).toEqual('200.00');
  }));

  it('should return stop loss per unit loss', inject(function(MainService){
    var result = MainService.calculate(
      10000, 2, 'LONG', 25, 24
    );
    expect(result.getStopLossPerUnitLoss()).toEqual('1.00');
  }));

  it('should return total', inject(function(MainService){
    var result = MainService.calculate(
      10000, 2, 'LONG', 25, 24
    );
    expect(result.getTotal()).toEqual('5000.00');
  }));

});
