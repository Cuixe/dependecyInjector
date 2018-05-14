var Injector = require('./Injector')
var injector = new Injector();

module.exports = {

    register : function(dependecyName, file) {
        injector.registerDependency(dependecyName, file);
    },
    registerDependency : function(dependecyName, file) {
        injector.registerDependency(dependecyName, file);
    },

    require : function(dependecyName) {
        return injector.get(dependecyName);
    },
    get : function(dependecyName) {
        return injector.get(dependecyName);
    }
}