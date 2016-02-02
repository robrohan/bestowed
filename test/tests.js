var jsdom = require('mocha-jsdom');
var expect = require("chai").expect;

var bestowed = require( "../src/bestowed.js" ).bestowed;

describe('Bestowed', function() {
    jsdom();

    describe('#scriptPath()', function() {
        it('should remove filename from path and return path', function() {
            var script = document.createElement('script');
            script.src = "http://yadda.com/thing/thang/thong.html";
            var input = [script];
            expected = "http://yadda.com/thing/thang/";

            actual = bestowed.scriptPath(input);

            expect(actual).eql(expected);
        });
    });

    describe('#isLocalPath()', function() {
        it('should know if a / path is within our source tree', function() {
            var expected = true;
            var actual = bestowed.isLocalPath("yadda.com/thing/thang/");

            expect(actual).eql(expected);
        });

        it('should know if an http path is within our source tree', function() {
            var expected = false;
            var actual = bestowed.isLocalPath("http://yadda.com/thing/thang/");

            expect(actual).eql(expected);
        });

        it('should know if an file path is within our source tree', function() {
            var expected = false;
            var actual = bestowed.isLocalPath("file://yadda.com/thing/thang/");

            expect(actual).eql(expected);
        });
    });

});
