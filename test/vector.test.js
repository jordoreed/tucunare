const assert = require("assert");
const vector = require("../src/vector");
const vec2 = vector.vec2;
const vec3 = vector.vec3;
const vec4 = vector.vec4;

var vectorTypes = [ "vec2", "vec3", "vec4" ];

vectorTypes.forEach(function(vectorTypeName) {
  describe(vectorTypeName, function() {
    const vectorType = vector[vectorTypeName];
    const numVectorComponents = vectorType === vec2 ? 2 : vectorType === vec3 ? 3 : 4;

    it("constructor", function() {
      const vec = new vectorType(1.1, 2.2, 3.3, 4.4);
      assert.equal(vec.x, 1.1);
      assert.equal(vec.y, 2.2);
      if (numVectorComponents > 2) {
        assert.equal(vec.z, 3.3);
      }
      if (numVectorComponents > 3) {
        assert.equal(vec.w, 4.4);
      }
    });

    it("toString", function() {
      const vec = new vectorType(1.1, 2.2, 3.3, 4.4);
      let str = "{ 1.1, 2.2";
      if (numVectorComponents > 2) {
        str += ", 3.3";
      }
      if (numVectorComponents > 3) {
        str += ", 4.4"
      }
      str += " }";
      assert.equal(vec.toString(), str);
    });

    it("dot", function() {
      var x1 = 1.3,  y1 = -23.4, z1 = 98, w1 = 32;
      var x2 = -7.1, y2 = 23440, z2 = -1, w2 = 92384;
      const vec1 = new vectorType(x1, y1, z1, w1);
      const vec2 = new vectorType(x2, y2, z2, w2);
      let dotProduct = (x1 * x2) + (y1 * y2);
      if (numVectorComponents > 2) {
        dotProduct += (z1 * z2);
      }
      if (numVectorComponents > 3) {
        dotProduct += (w1 * w2);
      }
      assert.equal(vec1.dot(vec2), dotProduct);
    });

    var standardMathTests = [
      "add",      "addEquals",      "addN",      "addEquals",
      "subtract", "subtractEquals", "subtractN", "subtractEqualsN",
      "scale",    "scaleEquals",    "scaleN",    "scaleEqualsN",
      "divide",   "divideEquals",   "divideN",   "divideEqualsN"
    ];
    standardMathTests.forEach(function(which) {
      var x1 = -7,  y1 = 19,   z1 = 234, w1 = 122343;
      var x2 = 2.3, y2 = -3.1, z2 = 9.1, w2 = -183;
      var scalar = -3.14;
      it(which, function() {
        let vec;
        if (which.charAt(which.length-1) !== "N") {
          if (which.indexOf("Equals") !== -1) {
            vec = new vectorType(x1, y1, z1, w1);
            vec[which](new vectorType(x2, y2, z2, w2));
          }
          else {
            vec = new vectorType(x1, y1, z1, w1)[which](new vectorType(x2, y2, z2, w2));
          }
        }
        else {
          x2 = scalar, y2 = scalar, z2 = scalar, w2 = scalar;
          if (which.indexOf("Equals") !== -1) {
            vec = new vectorType(x1, y1, z1, w1);
            vec[which](scalar);
          }
          else {
            vec = new vectorType(x1, y1, z1, w1)[which](scalar);
          }
        }

        var resultX, resultY, resultZ, resultW;
        if (which.startsWith("add")) {
          resultX = x1 + x2;
          resultY = y1 + y2;
          resultZ = z1 + z2;
          resultW = w1 + w2;
        }
        else if (which.startsWith("subtract")) {
          resultX = x1 - x2;
          resultY = y1 - y2;
          resultZ = z1 - z2;
          resultW = w1 - w2;
        }
        else if (which.startsWith("scale")) {
          resultX = x1 * x2;
          resultY = y1 * y2;
          resultZ = z1 * z2;
          resultW = w1 * w2;
        }
        else if (which.startsWith("divide")) {
          resultX = x1 / x2;
          resultY = y1 / y2;
          resultZ = z1 / z2;
          resultW = w1 / w2;
        }
        else {
          throw "Error";
        }

        assert.equal(vec.x, resultX);
        assert.equal(vec.y, resultY);
        if (numVectorComponents > 2) {
          assert.equal(vec.z, resultZ);
        }
        if (numVectorComponents > 3) {
          assert.equal(vec.w, resultW);
        }
      });
    });
  });
});