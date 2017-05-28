function Shader() {
  this.uniforms = {};
  this.incoming = {};
  this.main = function() {
    throw "Must override the shader main function";
  };
}

Shader.prototype.findIncomingSourcesLength = function() {
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

Shader.prototype.getVertexShaderInput = function(index) {
  var input = {};
  for (var propName in this.incoming) {
    if (this.incoming.hasOwnProperty(propName)) {
      input[propName] = this.incoming[propName][index];
    }
  }
  return input;
};

Shader.prototype.runVertexMain = function(input) {
  var result = this.main(input);
  if (typeof result != "object" || !result.position || result.position.constructor != vec4) {
    throw {
      message: "Expected vertex shader to return an object with property 'position'",
      returnValue: result
    };
  }
  return result;
};

Shader.prototype.runFragmentMain = function(input) {
  var result = this.main(input);
  if (!result || result.constructor != vec4) {
    throw {
      message: "Expected fragment shader to return value of type vec4",
      returnValue: result
    };
  }
  return result;
};