if (typeof module != "undefined" && module.exports) {
  module.exports.mat4 = mat4;
}

function mat4(
  m00, m01, m02, m03,
  m04, m05, m06, m07,
  m08, m09, m10, m11,
  m12, m13, m14, m15) {
  if (arguments.length != 16) {
    throw "Expected 16 arguments in mat4 constructor";
  }

  this.values = [
    m00, m01, m02, m03,
    m04, m05, m06, m07,
    m08, m09, m10, m11,
    m12, m13, m14, m15
  ];
}

mat4.prototype.toString = function() {
  return JSON.stringify(this.values);
};

mat4.prototype.duplicate = function() {
  return new mat4(
    this.values[ 0], this.values[ 1], this.values[ 2], this.values[ 3],
    this.values[ 4], this.values[ 5], this.values[ 6], this.values[ 7],
    this.values[ 8], this.values[09], this.values[10], this.values[11],
    this.values[12], this.values[13], this.values[14], this.values[15]);
};

mat4.prototype.toArray = function() {
  return [
    this.values[ 0], this.values[ 1], this.values[ 2], this.values[ 3],
    this.values[ 4], this.values[ 5], this.values[ 6], this.values[ 7],
    this.values[ 8], this.values[09], this.values[10], this.values[11],
    this.values[12], this.values[13], this.values[14], this.values[15]
  ];
};

mat4.prototype.transposeToArray = function() {
  return [
    this.values[ 0], this.values[ 4], this.values[ 8], this.values[12],
    this.values[ 1], this.values[ 5], this.values[ 9], this.values[13],
    this.values[ 2], this.values[ 6], this.values[10], this.values[14],
    this.values[ 3], this.values[ 7], this.values[11], this.values[15]
  ];
};

mat4.prototype.transpose = function() {
  return new mat4(
    this.values[ 0], this.values[ 4], this.values[ 8], this.values[12],
    this.values[ 1], this.values[ 5], this.values[ 9], this.values[13],
    this.values[ 2], this.values[ 6], this.values[10], this.values[14],
    this.values[ 3], this.values[ 7], this.values[11], this.values[15]);
};

mat4.prototype.multiply = function(r) {
  // m00 m01 m02 m03     m00 m01 m02 m03
  // m04 m05 m06 m07     m04 m05 m06 m07
  // m08 m09 m10 m11  X  m08 m09 m10 m11
  // m12 m13 m14 m15     m12 m13 m14 m15
  return new mat4(
    (this.values[ 0] * r.values[ 0]) + (this.values[ 1] * r.values[ 4]) + (this.values[ 2] * r.values[ 8]) + (this.values[ 3] * r.values[12]),
    (this.values[ 0] * r.values[ 1]) + (this.values[ 1] * r.values[ 5]) + (this.values[ 2] * r.values[ 9]) + (this.values[ 3] * r.values[13]),
    (this.values[ 0] * r.values[ 2]) + (this.values[ 1] * r.values[ 6]) + (this.values[ 2] * r.values[10]) + (this.values[ 3] * r.values[14]),
    (this.values[ 0] * r.values[ 3]) + (this.values[ 1] * r.values[ 7]) + (this.values[ 2] * r.values[11]) + (this.values[ 3] * r.values[15]),
    (this.values[ 4] * r.values[ 0]) + (this.values[ 5] * r.values[ 4]) + (this.values[ 6] * r.values[ 8]) + (this.values[ 7] * r.values[12]),
    (this.values[ 4] * r.values[ 1]) + (this.values[ 5] * r.values[ 5]) + (this.values[ 6] * r.values[ 9]) + (this.values[ 7] * r.values[13]),
    (this.values[ 4] * r.values[ 2]) + (this.values[ 5] * r.values[ 6]) + (this.values[ 6] * r.values[10]) + (this.values[ 7] * r.values[14]),
    (this.values[ 4] * r.values[ 3]) + (this.values[ 5] * r.values[ 7]) + (this.values[ 6] * r.values[11]) + (this.values[ 7] * r.values[15]),
    (this.values[ 8] * r.values[ 0]) + (this.values[ 9] * r.values[ 4]) + (this.values[10] * r.values[ 8]) + (this.values[11] * r.values[12]),
    (this.values[ 8] * r.values[ 1]) + (this.values[ 9] * r.values[ 5]) + (this.values[10] * r.values[ 9]) + (this.values[11] * r.values[13]),
    (this.values[ 8] * r.values[ 2]) + (this.values[ 9] * r.values[ 6]) + (this.values[10] * r.values[10]) + (this.values[11] * r.values[14]),
    (this.values[ 8] * r.values[ 3]) + (this.values[ 9] * r.values[ 7]) + (this.values[10] * r.values[11]) + (this.values[11] * r.values[15]),
    (this.values[12] * r.values[ 0]) + (this.values[13] * r.values[ 4]) + (this.values[14] * r.values[ 8]) + (this.values[15] * r.values[12]),
    (this.values[12] * r.values[ 1]) + (this.values[13] * r.values[ 5]) + (this.values[14] * r.values[ 9]) + (this.values[15] * r.values[13]),
    (this.values[12] * r.values[ 2]) + (this.values[13] * r.values[ 6]) + (this.values[14] * r.values[10]) + (this.values[15] * r.values[14]),
    (this.values[12] * r.values[ 3]) + (this.values[13] * r.values[ 7]) + (this.values[14] * r.values[11]) + (this.values[15] * r.values[15]));
};

mat4.prototype.multiplyEquals = function(r) {
  // m00 m01 m02 m03     m00 m01 m02 m03
  // m04 m05 m06 m07     m04 m05 m06 m07
  // m08 m09 m10 m11  X  m08 m09 m10 m11
  // m12 m13 m14 m15     m12 m13 m14 m15
  this.values[ 0] = (this.values[ 0] * r.values[ 0]) + (this.values[ 1] * r.values[ 4]) + (this.values[ 2] * r.values[ 8]) + (this.values[ 3] * r.values[12]);
  this.values[ 1] = (this.values[ 0] * r.values[ 1]) + (this.values[ 1] * r.values[ 5]) + (this.values[ 2] * r.values[ 9]) + (this.values[ 3] * r.values[13]);
  this.values[ 2] = (this.values[ 0] * r.values[ 2]) + (this.values[ 1] * r.values[ 6]) + (this.values[ 2] * r.values[10]) + (this.values[ 3] * r.values[14]);
  this.values[ 3] = (this.values[ 0] * r.values[ 3]) + (this.values[ 1] * r.values[ 7]) + (this.values[ 2] * r.values[11]) + (this.values[ 3] * r.values[15]);
  this.values[ 4] = (this.values[ 4] * r.values[ 0]) + (this.values[ 5] * r.values[ 4]) + (this.values[ 6] * r.values[ 8]) + (this.values[ 7] * r.values[12]);
  this.values[ 5] = (this.values[ 4] * r.values[ 1]) + (this.values[ 5] * r.values[ 5]) + (this.values[ 6] * r.values[ 9]) + (this.values[ 7] * r.values[13]);
  this.values[ 6] = (this.values[ 4] * r.values[ 2]) + (this.values[ 5] * r.values[ 6]) + (this.values[ 6] * r.values[10]) + (this.values[ 7] * r.values[14]);
  this.values[ 7] = (this.values[ 4] * r.values[ 3]) + (this.values[ 5] * r.values[ 7]) + (this.values[ 6] * r.values[11]) + (this.values[ 7] * r.values[15]);
  this.values[ 8] = (this.values[ 8] * r.values[ 0]) + (this.values[ 9] * r.values[ 4]) + (this.values[10] * r.values[ 8]) + (this.values[11] * r.values[12]);
  this.values[ 9] = (this.values[ 8] * r.values[ 1]) + (this.values[ 9] * r.values[ 5]) + (this.values[10] * r.values[ 9]) + (this.values[11] * r.values[13]);
  this.values[10] = (this.values[ 8] * r.values[ 2]) + (this.values[ 9] * r.values[ 6]) + (this.values[10] * r.values[10]) + (this.values[11] * r.values[14]);
  this.values[11] = (this.values[ 8] * r.values[ 3]) + (this.values[ 9] * r.values[ 7]) + (this.values[10] * r.values[11]) + (this.values[11] * r.values[15]);
  this.values[12] = (this.values[12] * r.values[ 0]) + (this.values[13] * r.values[ 4]) + (this.values[14] * r.values[ 8]) + (this.values[15] * r.values[12]);
  this.values[13] = (this.values[12] * r.values[ 1]) + (this.values[13] * r.values[ 5]) + (this.values[14] * r.values[ 9]) + (this.values[15] * r.values[13]);
  this.values[14] = (this.values[12] * r.values[ 2]) + (this.values[13] * r.values[ 6]) + (this.values[14] * r.values[10]) + (this.values[15] * r.values[14]);
  this.values[15] = (this.values[12] * r.values[ 3]) + (this.values[13] * r.values[ 7]) + (this.values[14] * r.values[11]) + (this.values[15] * r.values[15]);
};

mat4.prototype.multiplyV2 = function(v) {
  // m00 m01 m02 m03     x
  // m04 m05 m06 m07     y
  // m08 m09 m10 m11  X
  // m12 m13 m14 m15
  return new vec2(
    this.values[ 0] * v.x + this.values[ 1] * v.y + this.values[ 3],
    this.values[ 4] * v.x + this.values[ 5] * v.y + this.values[ 7]);
};

mat4.prototype.multiplyV3 = function(v) {
  // m00 m01 m02 m03     x
  // m04 m05 m06 m07     y
  // m08 m09 m10 m11  X  z
  // m12 m13 m14 m15
  return new vec3(
    this.values[ 0] * v.x + this.values[ 1] * v.y + this.values[ 2] * v.z + this.values[ 3],
    this.values[ 4] * v.x + this.values[ 5] * v.y + this.values[ 6] * v.z + this.values[ 7],
    this.values[ 8] * v.x + this.values[ 9] * v.y + this.values[10] * v.z + this.values[11]);
};

mat4.prototype.multiplyV4 = function(v) {
  // m00 m01 m02 m03     x
  // m04 m05 m06 m07     y
  // m08 m09 m10 m11  X  z
  // m12 m13 m14 m15     w
  return new vec4(
    (this.values[ 0] * v.x) + (this.values[ 1] * v.y) + (this.values[ 2] * v.z) + (this.values[ 3] * v.w),
    (this.values[ 4] * v.x) + (this.values[ 5] * v.y) + (this.values[ 6] * v.z) + (this.values[ 7] * v.w),
    (this.values[ 8] * v.x) + (this.values[ 9] * v.y) + (this.values[10] * v.z) + (this.values[11] * v.w),
    (this.values[12] * v.x) + (this.values[13] * v.y) + (this.values[14] * v.z) + (this.values[15] * v.w));
};


//
// STATIC
//

mat4.identity = function() {
  return new mat4(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1);
};

mat4.perspective = function(l, r, b, t, n, f) {
  return new mat4(
    ((2*n)/(r-l)), 0,             ((r+l)/(r-l)),  0,
    0,             ((2*n)/(t-b)), ((t+b)/(t-b)),  0,
    0,             0,             (-(f+n)/(f-n)), ((-2*f*n)/(f-n)),
    0,             0,             -1,             0);
};

mat4.perspectiveAspectRatio = function(aspectRatio, fov, n, f) {
  var halfH = Math.tan(MathUtils.toRadians(fov * 0.5)) * n;
  var halfW = aspectRatio * halfH;
  return mat4.perspective(-halfW, halfW, -halfH, halfH, n, f);
};

mat4.orthographic = function(l, r, b, t, n, f) {
  return new mat4(
    (2/(r-l)), 0,         0,          -((r+l)/(r-l)),
    0,         (2/(t-b)), 0,          -((t+b)/(t-b)),
    0,         0,         (-2/(f-n)), -((f+n)/(f-n)),
    0,         0,         0,          1);
};

mat4.orthographicAspectRatio = function(aspectRatio, n, f) {
  var l, r, b, t;
  if (aspectRatio <= 1) {
    l = -1;
    r = 1;
    t = 1.0 / aspectRatio;
    b = -t;
  }
  else {
    r = aspectRatio;
    l = -r;
    b = -1;
    t = 1;
  }
  return mat4.orthographic(l, r, t, b, n, f);
};

mat4.translate = function(x, y, z) {
  return new mat4(
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1);
};

mat4.translateV = function(t) {
  return mat4.translate(t.x, t.y, t.z);
};

mat4.scale = function(x, y, z) {
  return new mat4(
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1);
};

mat4.scaleS = function(s) {
  return mat4.scale(s, s, s);
};

// pitch
mat4.rotateX = function(degrees) {
  var radians = MathUtils.toRadians(degrees);
  var c = Math.cos(radians);
  var s = Math.sin(radians);
  return new mat4(
    1, 0, 0, 0,
    0, c,-s, 0,
    0, s, c, 0,
    0, 0, 0, 1);
};

// yaw
mat4.rotateY = function(degrees) {
  var radians = MathUtils.toRadians(degrees);
  var c = Math.cos(radians);
  var s = Math.sin(radians);
  return new mat4(
    c, 0, s, 0,
    0, 1, 0, 0,
   -s, 0, c, 0,
    0, 0, 0, 1);
};

// roll
mat4.rotateZ = function(degrees) {
  var radians = MathUtils.toRadians(degrees);
  var c = Math.cos(radians);
  var s = Math.sin(radians);
  return new mat4(
    c,-s, 0, 0,
    s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1);
};

mat4.lookAt = function(pos, focus, up) {
  var z = pos.subtract(focus);
  z.normalizeEquals();
  var x = z.cross(up);
  x.normalizeEquals();
  var y = x.cross(z);
  y.normalizeEquals();

  var m1 = new mat4(
    x.x, x.y, x.z, 0, // i
    y.x, y.y, y.z, 0, // j
    z.x, z.y, z.z, 0, // k
    0,   0,   0,   1);
  return m1.multiply(mat4.translate(-pos.x, -pos.y, -pos.z));
};
