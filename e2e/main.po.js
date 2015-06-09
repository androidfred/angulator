/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.capital = element(by.id('capital'));
  this.capitalRequired = element(by.id('capitalRequired'));

  this.risk = element(by.id('risk'));
  this.direction = element(by.id('direction'));
  this.price = element(by.id('price'));
  this.stopLoss = element(by.id('stopLossPrice'));

  this.calculateButton = element(by.id('calculateButton'));

  this.error = element(by.id('error'));
  this.result = element(by.id('result'));

  this.totalTolerableRiskPerTrade = element(by.id('totalTolerableRiskPerTrade'));
};

module.exports = new MainPage();
