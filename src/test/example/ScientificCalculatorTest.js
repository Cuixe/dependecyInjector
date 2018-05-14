var chai = require('chai');
var expect = chai.expect;

describe('Scientific Calculator', function() {
    var requireUtils = require('../../main/Require');
    requireUtils.register('calc', {
        sum:function(a,b) {
            return -1;
        },
        sub: function(a,b) {
            return -1;
        }
    });
    requireUtils.register('scientificCalc', 'example/ScientificCalculator');

    it('Mocked Add', function() {
        var sCalc = requireUtils.get('scientificCalc');
        expect(sCalc.sum(100,100)).eq(-1);
    });

    it('Mocked Sub', function() {
        var sCalc = requireUtils.get('scientificCalc');
        expect(sCalc.sub(1,100)).eq(-1);
    });
});