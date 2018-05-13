var Injector = require("../main/Injector");
var chai = require('chai');
var expect = chai.expect;
describe('Inector Test Suite', function() {
    it('setPathWithoutEndingSlash', function() {
        var injector = new Injector("src/main");
        expect(injector.srcPath).not.empty;
        expect(injector.srcPath.charAt(injector.srcPath.length -1)).eq("/");
        console.log(injector.appDir);
    });


    it('setPathWithEndingSlash', function() {
        var injector = new Injector("src/main/");
        expect(injector.srcPath).not.empty;
        expect(injector.srcPath.charAt(injector.srcPath.length -2)).not.eq("/");
    });
});