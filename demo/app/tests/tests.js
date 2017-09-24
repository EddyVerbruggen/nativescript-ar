var AR = require("nativescript-ar").AR;
var ar = new AR();

describe("isSupported", function() {
    it("exists", function() {
        expect(ar.isSupported).toBeDefined();
    });

    it("returns a boolean", function() {
        expect(ar.isSupported()).toEqual(true || false);
    });
});