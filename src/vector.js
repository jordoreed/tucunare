function vec2(x, y) {
  if (!x) x = 0;
  if (!y) y = 0;
  this.x = x;
  this.y = y;
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
  if (!x) x = 0.0;
  if (!y) y = 0.0;
  if (!z) z = 0.0;
  this.x = x;
  this.y = y;
  this.z = z;
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
  if (!x) x = 0.0;
  if (!y) y = 0.0;
  if (!z) z = 0.0;
  if (!w) w = 0.0;
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
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
