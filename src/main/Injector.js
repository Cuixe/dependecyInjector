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

Injector.prototype.register = function (dependecyName, dependency) {
    var handledDependency = {name: dependecyName, type:0, object: undefined};
    if (dependency == undefined) {
        handledDependency.type = 2;
        handledDependency.object = dependecyName;
    } else {
        var type = typeof dependency;
        if (type == "string") {
            var ext = dependency.substr(dependency.length - 3, dependency.length);
            if (ext != ".js") { 
                dependency += ".js";
            }
            handledDependency.type = 1;
            var path = this.projectPath + this.mainPath + dependency;
            if(fs.existsSync(path)) {
                handledDependency.object = path.replace('.js', '');
            }
            var path = this.projectPath + this.testPath + dependency;
            if(fs.existsSync(path)) {
                handledDependency.object = path.replace('.js', '');
            }
        } else {
            handledDependency.type = 3;
            handledDependency.object = dependency;
        }
    }
    this.handledDependencies[dependecyName] = handledDependency;
}

Injector.prototype.get = function (dependecyName) {
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