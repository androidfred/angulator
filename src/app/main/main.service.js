'use strict';

angular.module('angulator')
  .service('MainService', function () {

    //The inside of this service is a learning experiment in "Fundamentalist OO in JavaScript", eg:
    //
    //* Long and Short inherit most of their behavior from the parent prototype ("class") Position
    //* inputs like Capital are instantiated as objects which enforce own validation, provide own behavior etc
    //* inputs use declarative composable decorators to reuse shared behavior
    //
    //I don't necessarily advocate using this style in JavaScript or Angular, (which isn't really OO anyway)
    //nonetheless it's fun to experiment and learn how to implement things in different styles.

    var PositiveSignum = function (verify) {
      if (!verify ||
        isNaN(verify) ||
        typeof verify !== 'number' ||
        verify < 0 ||
        verify === 0 || !isFinite(verify)) {
        throw new TypeError('All numbers must have positive signum');
      }
      this.verified = verify;
    };

    PositiveSignum.prototype.provide = function () {
      return this.verified;
    };

    var Capital = function (verify) {
      this.verified = new PositiveSignum(verify).provide();
    };

    Capital.prototype.provide = function () {
      return this.verified;
    };

    var PricePerUnit = function (verify) {
      this.verified = new PositiveSignum(verify).provide();
    };

    PricePerUnit.prototype.provide = function () {
      return this.verified;
    };

    var StopLossPricePerUnit = function (verify) {
      this.verified = new PositiveSignum(verify).provide();
    };

    StopLossPricePerUnit.prototype.provide = function () {
      return this.verified;
    };

    var Below = function (verify) {
      if (!(new PositiveSignum(verify).provide() < 100)) {
        throw new TypeError('Tolerable risk in percent of capital per trade must be less than 100');
      }
      this.verified = verify;
    };

    Below.prototype.provide = function () {
      return this.verified;
    };

    var TolerableRiskInPercentOfCapital = function (verify) {
      this.verified = new Below(verify).provide();
    };

    TolerableRiskInPercentOfCapital.prototype.provide = function () {
      return this.verified;
    };

    var Position = function (capital,
                             tolerableRiskInPercentOfCapital,
                             pricePerUnit,
                             stopLossPricePerUnit) {
      this.capital = capital;
      this.tolerableRiskInPercentOfCapital = tolerableRiskInPercentOfCapital;
      this.pricePerUnit = pricePerUnit;
      this.stopLossPricePerUnit = stopLossPricePerUnit;
    };

    Position.prototype.getTotalTolerableRiskPerTrade = function () {
      return (this.capital.provide() * (this.tolerableRiskInPercentOfCapital.provide() / 100)).toFixed(2);
    };

    Position.prototype.getStopLossPerUnitLoss = function () {

    };

    Position.prototype.getStopLossTotalLoss = function () {
      return (this.getStopLossPerUnitLoss() * this.getUnitsToBuy()).toFixed(2);
    };

    Position.prototype.getUnitsToBuy = function () {
      var result = Math.floor((this.getTotalTolerableRiskPerTrade() / this.getStopLossPerUnitLoss()));
      if (this.capital.provide() <= (result * this.pricePerUnit.provide())) {
        return 0;
      } else {
        return result;
      }
    };

    Position.prototype.getTotal = function () {
      return (this.getUnitsToBuy() * this.getPricePerUnit()).toFixed(2);
    };

    Position.prototype.getPricePerUnit = function () {
      return this.pricePerUnit.provide();
    };

    function Long(capital,
                  tolerableRiskInPercentOfCapital,
                  pricePerUnit,
                  stopLossPricePerUnit) {
      if (pricePerUnit.provide() <= stopLossPricePerUnit.provide()) {
        throw new TypeError('Stop loss price per unit must be lower than price per unit when long');
      }
      Position.call(this,
        capital,
        tolerableRiskInPercentOfCapital,
        pricePerUnit,
        stopLossPricePerUnit);

    }

    Long.prototype = Object.create(Position.prototype);
    Long.prototype.constructor = Position;
    Long.prototype.getStopLossPerUnitLoss = function () {
      return (this.pricePerUnit.provide() - this.stopLossPricePerUnit.provide()).toFixed(2);
    };

    function Short(capital,
                   tolerableRiskInPercentOfCapital,
                   pricePerUnit,
                   stopLossPricePerUnit) {
      if (pricePerUnit.provide() >= stopLossPricePerUnit.provide()) {
        throw new TypeError('Stop loss price per unit must be higher than price per unit when short');
      }
      Position.call(this,
        capital,
        tolerableRiskInPercentOfCapital,
        pricePerUnit,
        stopLossPricePerUnit);

    }

    Short.prototype = Object.create(Position.prototype);
    Short.prototype.constructor = Position;
    Short.prototype.getStopLossPerUnitLoss = function () {
      return (this.stopLossPricePerUnit.provide() - this.pricePerUnit.provide()).toFixed(2);
    };

    var validateDirection = function(direction){
      if (!direction) {
        throw new TypeError('direction must not be falsey');
      }
      if (typeof direction !== 'string' || !direction instanceof String) {
        throw new TypeError('direction must be a string');
      }
      if (!(direction.toLowerCase() === 'long' || direction.toLowerCase() === 'short')) {
        throw new TypeError('direction must be either long or short');
      }
    };

    //This function is ugly, it would be better if the controller instantiated either a long or a short
    //based on the direction. Oh well.
    this.calculate = function (capital,
                               tolerableRiskInPercentOfCapitalPerTrade,
                               direction,
                               pricePerUnit,
                               stopLossPricePerUnit) {
      validateDirection(direction);
      if (direction.toLowerCase() === 'long') {
        return new Long(
          new Capital(capital),
          new TolerableRiskInPercentOfCapital(tolerableRiskInPercentOfCapitalPerTrade),
          new PricePerUnit(pricePerUnit),
          new StopLossPricePerUnit(stopLossPricePerUnit)
        );
      } else {
        return new Short(
          new Capital(capital),
          new TolerableRiskInPercentOfCapital(tolerableRiskInPercentOfCapitalPerTrade),
          new PricePerUnit(pricePerUnit),
          new StopLossPricePerUnit(stopLossPricePerUnit)
        );
      }
    };
  });
