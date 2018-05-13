var chai = require('chai');
var expect = chai.expect;

describe('Require Fill Dependencies', function() {

    it('fill dependencies', function() {
        var requireUtils = require("../main/Require");
        requireUtils.registerDependency('fs');
        requireUtils.registerDependency('path', "mock/pathMock.js");
        requireUtils.registerFunction('foo', {
            write: function(value) {
                this.value = value;
            }, 
            read:function() {
                return this.value;
            }
        });
        expect(requireUtils.require('fs')).not.null;
        expect(requireUtils.require('path')).not.null;
        expect(requireUtils.require('stream')).not.null;
    });

    it('get dependencies', function() {
        var requireUtils = require("../main/Require");
        expect(requireUtils.require('fs')).not.null;
        expect(requireUtils.require('path')).not.null;
        expect(requireUtils.require('stream')).not.null;
    });

});

describe('Require Use Dependencies', function() {

    it('get dependencies', function() {
        var requireUtils = require("../main/Require");
        expect(requireUtils.require('fs')).not.null;
        expect(requireUtils.require('path')).not.null;
        var foo = requireUtils.require('foo');
        foo.write('SOME');
        expect(foo.read()).eq('SOME');
    });

});