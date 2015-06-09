'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./main.po');
  });

  it('should have presets', function () {
    expect(page.capital.getAttribute('value')).toBe('10000');
    expect(page.risk.getAttribute('value')).toBe('2');
    //expect(page.direction.getAttribute('value')).toBe('LONG') //0
    expect(page.price.getAttribute('value')).toBe('25')
    expect(page.stopLoss.getAttribute('value')).toBe('24')
  });

});
