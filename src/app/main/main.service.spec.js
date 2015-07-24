'use strict';

describe('services', function(){

  beforeEach(module('angulator'));

  it('should not accept undefined arguments', inject(function(MainService){
    var fn = function(){
      MainService.calculate(

      );
    };
    expect(fn).toThrowError(TypeError, "argument must be a number with positive signum");
  }));

  it('should not accept null arguments', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        null, null, null, null, null
      );
    };
    expect(fn).toThrowError(TypeError, "argument must be a number with positive signum");
  }));

  it('should not accept zero arguments', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        0, 0, 'LONG', 0, 0
      );
    };
    expect(fn).toThrowError(TypeError, "argument must be a number with positive signum");
  }));

  it('should not accept negative arguments', inject(function(MainService){
    var fn = function(){
      MainService.calculate(
        -1, -1, 'LONG', -1, -1
      );
    };
    expect(fn).toThrowError(TypeError, "argument must be a number with positive signum");
  }));

  it('should calculate long with whole numbers', inject(function(MainService){
    var result = MainService.calculate(
      10000, 2, 'LONG', 25, 24
    );
    expect(result.unitsToBuy).toEqual('200');
  }));

});
