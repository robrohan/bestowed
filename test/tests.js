var chai = require("chai"),
    expect = chai.expect;

var Bestowed = require( "../src/bestowed.js" ).Bestowed;

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            //chai.assert.equal(-1, [1,2,3].indexOf(5));
            //chai.assert.equal(-1, [1,2,3].indexOf(0));
            console.log("wtf");
            expect([1,2,3].indexOf(0)).toBe(-1);
        });
    });
});
