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

if (typeof module != "undefined" && module.exports) {
  module.exports.vec2 = vec2;
  module.exports.vec3 = vec3;
  module.exports.vec4 = vec4;
}

function vec2(x, y) {
  this.x = x ? x : 0;
  this.y = y ? y : 0;
}

vec2.prototype.toString = function() {
  return "{ " + this.x + ", " + this.y + " }";
};

vec2.prototype.add             = function(v) { return new vec2(this.x + v.x, this.y + v.y); };
vec2.prototype.addN            = function(n) { return new vec2(this.x + n,   this.y + n  ); };
vec2.prototype.subtract        = function(v) { return new vec2(this.x - v.x, this.y - v.y); };
vec2.prototype.subtractN       = function(n) { return new vec2(this.x - n,   this.y - n  ); };
vec2.prototype.scale           = function(v) { return new vec2(this.x * v.x, this.y * v.y); };
vec2.prototype.scaleN          = function(n) { return new vec2(this.x * n,   this.y * n  ); };
vec2.prototype.divide          = function(v) { return new vec2(this.x / v.x, this.y / v.y); };
vec2.prototype.divideN         = function(n) { return new vec2(this.x / n,   this.y / n  ); };
vec2.prototype.addEquals       = function(v) { this.x += v.x; this.y += v.y; };
vec2.prototype.addEqualsN      = function(n) { this.x += n;   this.y += n;   };
vec2.prototype.subtractEquals  = function(v) { this.x -= v.x; this.y -= v.y; };
vec2.prototype.subtractEqualsN = function(n) { this.x -= n;   this.y -= n;   };
vec2.prototype.scaleEquals     = function(v) { this.x *= v.x; this.y *= v.y; };
vec2.prototype.scaleEqualsN    = function(n) { this.x *= n;   this.y *= n;   };
vec2.prototype.divideEquals    = function(v) { this.x /= v.x; this.y /= v.y; };
vec2.prototype.divideEqualsN   = function(n) { this.x /= n;   this.y /= n;   };

vec2.prototype.dot      = function(v) { return (this.x * v.x) + (this.y * v.y); };
vec2.prototype.length   = function( ) { return Math.sqrt(this.dot(this)); };
vec2.prototype.distance = function(v) { return this.subtract(v).length(); };
vec2.prototype.angle    = function(v) { return Math.acos(clamp(this.dot(v), -1.0, 1.0)); };

vec2.prototype.normalize = function() {
  var v = new vec2(this.x, this.y);
  v.normalizeEquals();
  return v;
};

vec2.prototype.normalizeEquals = function() {
  var len = this.length();
  if (len != 0.0) {
    this.x /= len;
    this.y /= len;
  }
};



function vec3(x, y, z) {
  this.x = x ? x : 0;
  this.y = y ? y : 0;
  this.z = z ? z : 0;
}

vec3.prototype.toString = function() {
  return "{ " + this.x + ", " + this.y + ", " + this.z + " }";
};

vec3.prototype.add             = function(v) { return new vec3(this.x + v.x, this.y + v.y, this.z + v.z); };
vec3.prototype.addN            = function(n) { return new vec3(this.x + n,   this.y + n,   this.z + n  ); };
vec3.prototype.subtract        = function(v) { return new vec3(this.x - v.x, this.y - v.y, this.z - v.z); };
vec3.prototype.subtractN       = function(n) { return new vec3(this.x - n,   this.y - n,   this.z - n  ); };
vec3.prototype.scale           = function(v) { return new vec3(this.x * v.x, this.y * v.y, this.z * v.z); };
vec3.prototype.scaleN          = function(n) { return new vec3(this.x * n,   this.y * n,   this.z * n  ); };
vec3.prototype.divide          = function(v) { return new vec3(this.x / v.x, this.y / v.y, this.z / v.z); };
vec3.prototype.divideN         = function(n) { return new vec3(this.x / n,   this.y / n,   this.z / n  ); };
vec3.prototype.addEquals       = function(v) { this.x += v.x; this.y += v.y; this.z += v.z; };
vec3.prototype.addEqualsN      = function(n) { this.x += n;   this.y += n;   this.z += n;   };
vec3.prototype.subtractEquals  = function(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; };
vec3.prototype.subtractEqualsN = function(n) { this.x -= n;   this.y -= n;   this.z -= n;   };
vec3.prototype.scaleEquals     = function(v) { this.x *= v.x; this.y *= v.y; this.z *= v.z; };
vec3.prototype.scaleEqualsN    = function(n) { this.x *= n;   this.y *= n;   this.z *= n;   };
vec3.prototype.divideEquals    = function(v) { this.x /= v.x; this.y /= v.y; this.z /= v.z; };
vec3.prototype.divideEqualsN   = function(n) { this.x /= n;   this.y /= n;   this.z /= n;   };

vec3.prototype.dot      = function(v) { return (this.x * v.x) + (this.y * v.y) + (this.z * v.z); };
vec3.prototype.length   = function( ) { return Math.sqrt(this.dot(this)); };
vec3.prototype.distance = function(v) { return this.subtract(v).length(); };
vec3.prototype.angle    = function(v) { return Math.acos(clamp(this.dot(v), -1.0, 1.0)); };
vec3.prototype.cross    = function(v) {
  return new vec3(
    (this.y * v.z) - (this.z * v.y),
    (this.z * v.x) - (this.x * v.z),
    (this.x * v.y) - (this.y * v.x));
};

vec3.prototype.normalize = function() {
  var newVec = new vec3(this.x, this.y, this.z);
  newVec.normalize();
  return newVec;
};

vec3.prototype.normalizeEquals = function() {
  var len = this.length();
  if (len != 0.0) {
    this.x /= len;
    this.y /= len;
    this.z /= len;
  }
};



function vec4(x, y, z, w) {
  this.x = x ? x : 0;
  this.y = y ? y : 0;
  this.z = z ? z : 0;
  this.w = w ? w : 0;
}

vec4.prototype.toString = function() {
  return "{ " + this.x + ", " + this.y + ", " + this.z + ", " + this.w + " }";
};

vec4.prototype.add             = function(v) { return new vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w); };
vec4.prototype.addN            = function(n) { return new vec4(this.x + n,   this.y + n,   this.z + n,   this.w + n  ); };
vec4.prototype.subtract        = function(v) { return new vec4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w); };
vec4.prototype.subtractN       = function(n) { return new vec4(this.x - n,   this.y - n,   this.z - n,   this.w - n  ); };
vec4.prototype.scale           = function(v) { return new vec4(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w); };
vec4.prototype.scaleN          = function(n) { return new vec4(this.x * n,   this.y * n,   this.z * n,   this.w * n  ); };
vec4.prototype.divide          = function(v) { return new vec4(this.x / v.x, this.y / v.y, this.z / v.z, this.w / v.w); };
vec4.prototype.divideN         = function(n) { return new vec4(this.x / n,   this.y / n,   this.z / n,   this.w / n  ); };
vec4.prototype.addEquals       = function(v) { this.x += v.x; this.y += v.y; this.z += v.z; this.w += v.w; };
vec4.prototype.addEqualsN      = function(n) { this.x += n;   this.y += n;   this.z += n;   this.w += n;   };
vec4.prototype.subtractEquals  = function(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; this.w -= v.w; };
vec4.prototype.subtractEqualsN = function(n) { this.x -= n;   this.y -= n;   this.z -= n;   this.w -= n;   };
vec4.prototype.scaleEquals     = function(v) { this.x *= v.x; this.y *= v.y; this.z *= v.z; this.w *= v.w; };
vec4.prototype.scaleEqualsN    = function(n) { this.x *= n;   this.y *= n;   this.z *= n;   this.w *= n;   };
vec4.prototype.divideEquals    = function(v) { this.x /= v.x; this.y /= v.y; this.z /= v.z; this.w /= v.w; };
vec4.prototype.divideEqualsN   = function(n) { this.x /= n;   this.y /= n;   this.z /= n;   this.w /= n;   };

vec4.prototype.dot = function(v) { return (this.x * v.x) + (this.y * v.y) + (this.z * v.z) + (this.w * v.w); };
