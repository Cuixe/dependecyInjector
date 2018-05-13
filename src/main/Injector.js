function Injector(projectPath, srcPath) {
    var path = require('path');
    var current = path.resolve(__dirname);
    this.srcPath = srcPath;
    if (srcPath.charAt(srcPath.length -1) != "/")    
        this.srcPath += "/";
    
}

Injector.prototype.registerLocalDependecy = function(dependecyName, file) {
    this.dependenciesHandled[dependecyName] = this.projectPath + file;
}

Injector.prototype.registerDependency = function(dependecyName, file) {
    this.dependenciesHandled[dependecyName] = file;
}

Injector.prototype.getDependency = function(dependecyName) {
    var file = this.dependecyName[name];
    return require(file);
}

module.exports = Injector;