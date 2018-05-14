var requireUtils = require('../../main/Require');
requireUtils.registerDependency('chai');
requireUtils.registerDependency('calc', 'example/Calculator');
var chai = requireUtils.get('chai');
var expect = chai.expect;

describe('Calculator Test Suit', function() {
    var calc = requireUtils.get('calc')
    it('Add', function() {
        var result = calc.sum(1,1);
        expect(result).eq(2);
    });

    it('Subtract', function() {
        var result = calc.sub(1,1);
        expect(result).eq(0);
    });

    it('Multiply', function() {
        var result = calc.mult(2,2);
        expect(result).eq(4);
    });

    it('Divide', function() {
        var result = calc.div(2,2);
        expect(result).eq(1);
    });

});