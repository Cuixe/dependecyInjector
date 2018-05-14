var chai = require('chai');
var expect = chai.expect;

describe('Require Fill Dependencies', function() {

    it('fill dependencies', function() {
        var requireUtils = require("../main/Require");
        requireUtils.register('fs');
        requireUtils.register('path', "mock/pathMock");
        requireUtils.register('structure', {
            write: function(value) {
                this.value = value;
            }, 
            read:function() {
                return this.value;
            }
        });

        requireUtils.register('Class', function() {
            this.write = function(value) {
                this.value = value;
            }, 
            this.read = function() {
                return this.value;
            }
        });

        requireUtils.register('function', function(str) {
            return "HELLO " + str;
        });
        expect(requireUtils.get('fs')).not.null;
        expect(requireUtils.get('path')).not.null;
        expect(requireUtils.get('stream')).not.null;
    });

    it('get dependencies', function() {
        var requireUtils = require("../main/Require");
        expect(requireUtils.get('fs')).not.null;
        expect(requireUtils.get('path')).not.null;
        expect(requireUtils.get('structure')).not.null;
    });

});

describe('Require Use Dependencies', function() {

    it('get dependencies', function() {
        var requireUtils = require("../main/Require");
        expect(requireUtils.get('fs')).not.null;
        expect(requireUtils.get('path')).not.null;
        var structure = requireUtils.get('structure');
        structure.write('SOME');
        expect(structure.read()).eq('SOME');

        var Class = requireUtils.get('Class');
        var object = new Class();
        object.write('ETC');
        expect(object.read()).eq('ETC');

        var func = requireUtils.get('function');
        expect(func("WORLD")).eq("HELLO WORLD");
    });

});