var DEFAULT_MAIN_PACKAGE = "src/main";
var DEFAULT_TEST_PACKAGE = "src/test";
var path = require('path');
var fs = require('fs');
var SLASH = '/';

function Injector(mainPath, testPath) {    
    this.handledDependencies = {};
    this.mainPath = mainPath == undefined ? DEFAULT_MAIN_PACKAGE : mainPath;
    this.testPath = testPath == undefined ? DEFAULT_TEST_PACKAGE : testPath;
    if (this.mainPath.charAt(this.mainPath.length - 1) != SLASH)
        this.mainPath += SLASH;
    if (this.testPath.charAt(this.testPath.length - 1) != SLASH)
        this.testPath += SLASH;
    var current = path.resolve(__dirname) + SLASH;
    this.projectPath = current.replace(this.mainPath, "").replace(this.testPath, "");
}

Injector.prototype.registerDependency = function (dependecyName, file) {
    file = file == undefined ? dependecyName : file; 
    var ext = file.substr(file.length - 3, file.length);
    var dependency = {name: dependecyName, type:0, object: undefined};
    if (ext == ".js") {
        dependency.type = 1;
        var path = this.projectPath + this.mainPath + file;
        if(fs.existsSync(path)) {
            dependency.object = path;
        }
        var path = this.projectPath + this.testPath + file;
        if(fs.existsSync(path)) {
            dependency.object = path;
        }
    } else {
        dependency.type = 2;
        dependency.object = dependecyName;
    }
    this.handledDependencies[dependecyName] = dependency;
}

Injector.prototype.registerFunction = function(dependecyName, callback) {
    var dependency = {name: dependecyName, type:3, object: callback};
    this.handledDependencies[dependecyName] = dependency;
}

Injector.prototype.require = function (dependecyName) {
    var dependency = this.handledDependencies[dependecyName];
    if (dependency == undefined) {
        return NaN;
    }
    switch(dependency.type) {
        case 1:
        case 2:
            return require(dependency.object);
        case 3:
        return dependency.object;
    }
}

module.exports = Injector;