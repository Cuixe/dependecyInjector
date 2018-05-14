var Injector = require('./Injector')
var injector = new Injector();

module.exports = {

    register : function(dependecyName, dependency) {
        injector.register(dependecyName, dependency);
    },

    get : function(dependecyName) {
        return injector.get(dependecyName);
    }
}