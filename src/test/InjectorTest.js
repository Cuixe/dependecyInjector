var Injector = require("../main/Injector");
var chai = require('chai');
var expect = chai.expect;
describe('Injector Test Suite', function() {

    it('setPathWithoutEndingSlash', function() {
        var injector = new Injector("src/main", "src/test");
        expect(injector.mainPath.charAt(injector.mainPath.length -1)).eq("/");
        expect(injector.testPath.charAt(injector.testPath.length -1)).eq("/");  
    });

    it('setPathWithEndingSlash', function() {
        var injector = new Injector("src/main/");
        expect(injector.mainPath).not.empty;
        expect(injector.testPath.charAt(injector.testPath.length -2)).not.eq("/");
    });

    it('registerDependecy', function() {
        var injector = new Injector();
        injector.registerDependency('path');
        var path = injector.get('path');
        expect(path.resolve(__dirname)).not.null;
    });

    it('registerMockDependecy', function() {
        var injector = new Injector();
        injector.registerDependency('path','mock/pathMock.js');
        var path = injector.get('path');
        expect(path.resolve(__dirname)).eq(__dirname);
    });

    it('registerFunctionDependecy', function() {
        var injector = new Injector();
        injector.registerDependency('path',{
            resolve : function(str) {
                return "ABC" + str;
            }
        });
        var path = injector.get('path');
        expect(path.resolve(__dirname)).eq("ABC"+__dirname);
    });
});