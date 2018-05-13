var Injector = require('./Injector')
var injector = new Injector();

module.exports = {

    registerDependency : function(dependecyName, file) {
        injector.registerDependency(dependecyName, file);
    },

    registerFunction : function(dependecyName, callback) {
        injector.registerFunction(dependecyName, callback);
    },

    require : function(dependecyName) {
        return injector.require(dependecyName);
    }
}