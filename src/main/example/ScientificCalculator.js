
var requireUtiles = require('../Require');
var calc = requireUtiles.get('calc');

module.exports = {

    result: function(a, b,) {
        return a % b;
    },
    sum : function(a, b) {
        return calc.sum(a, b);
    },
    sub : function(a, b) {
        return calc.sub(a, b);
    }
}