// MIT License
//
// Copyright (c) 2017 Jordan Reed
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

function VertexShader() {
  this.uniforms = {};
  this.incoming = {};
  this.main = function() {
    throw "Must override the vertex shader's main function";
  };
}

VertexShader.prototype.findIncomingSourcesLength = function() {
  var length = null;

  for (var propName in this.incoming) {
    if (this.incoming.hasOwnProperty(propName)) {
      var prop = this.incoming[propName];
      if (!prop || prop.constructor != Array) {
        throw {
          message: "Expected incoming source (" + propName + ") to be of type Array",
          source: prop
        };
      }

      var nextLength = prop.length;
      if (length != null && length != nextLength) {
        throw {
          message: "Incoming sources on shader must be the same length",
          incoming: this.incoming
        };
      }
      length = nextLength;
    }
  }

  return length === null ? 0 : length;
};

VertexShader.prototype.getInput = function(index) {
  var input = {};
  for (var propName in this.incoming) {
    if (this.incoming.hasOwnProperty(propName)) {
      input[propName] = this.incoming[propName][index];
    }
  }
  return input;
};

VertexShader.prototype.runMain = function(input) {
  var result = this.main(input);
  if (typeof result != "object" || !result.position || result.position.constructor != vec4) {
    throw {
      message: "Expected vertex shader to return an object with property 'position'",
      returnValue: result
    };
  }
  return result;
};




function FragmentShader() {
  this.uniforms = {};
  this.main = function() {
    throw "Must override the fragment shader's main function";
  };
}

FragmentShader.prototype.runMain = function(input) {
  var result = this.main(input);
  if (!result || result.constructor !== vec4) {
    throw {
      message: "Expected fragment shader to return value of type vec4",
      returnValue: result
    };
  }
  return result;
};
