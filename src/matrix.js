function mat4(
  m00, m01, m02, m03,
  m10, m11, m12, m13,
  m20, m21, m22, m23,
  m30, m31, m32, m33) {
  if (arguments.length <= 0) {
    this.m00 = 1.0; this.m01 = 0.0; this.m02 = 0.0; this.m03 = 0.0;
    this.m10 = 0.0; this.m11 = 1.0; this.m12 = 0.0; this.m13 = 0.0;
    this.m20 = 0.0; this.m21 = 0.0; this.m22 = 1.0; this.m23 = 0.0;
    this.m30 = 0.0; this.m31 = 0.0; this.m32 = 0.0; this.m33 = 1.0;
  }
  else {
    this.m00 = m00; this.m01 = m01; this.m02 = m02; this.m03 = m03;
    this.m10 = m10; this.m11 = m11; this.m12 = m12; this.m13 = m13;
    this.m20 = m20; this.m21 = m21; this.m22 = m22; this.m23 = m23;
    this.m30 = m30; this.m31 = m31; this.m32 = m32; this.m33 = m33;
  }
}

mat4.prototype.toString = function() {
  var str = "[ ";
  str += this.m00 + ", " + this.m01 + ", " + this.m02 + ", " + this.m03 + ", ";
  str += this.m10 + ", " + this.m11 + ", " + this.m12 + ", " + this.m13 + ", ";
  str += this.m20 + ", " + this.m21 + ", " + this.m22 + ", " + this.m23 + ", ";
  str += this.m30 + ", " + this.m31 + ", " + this.m32 + ", " + this.m33 + " ]";
  return str;
};

mat4.prototype.duplicate = function() {
  return new mat4(
    this.m00, this.m01, this.m02, this.m03,
    this.m10, this.m11, this.m12, this.m13,
    this.m20, this.m21, this.m22, this.m23,
    this.m30, this.m31, this.m32, this.m33);
};

mat4.prototype.toArray = function() {
  return [
    this.m00, this.m01, this.m02, this.m03,
    this.m10, this.m11, this.m12, this.m13,
    this.m20, this.m21, this.m22, this.m23,
    this.m30, this.m31, this.m32, this.m33
  ];
};

mat4.prototype.transposeToArray = function() {
  return [
    this.m00, this.m10, this.m20, this.m30,
    this.m01, this.m11, this.m21, this.m31,
    this.m02, this.m12, this.m22, this.m32,
    this.m03, this.m13, this.m23, this.m33
  ];
};

mat4.prototype.transpose = function() {
  return new mat4(
    this.m00, this.m10, this.m20, this.m30,
    this.m01, this.m11, this.m21, this.m31,
    this.m02, this.m12, this.m22, this.m32,
    this.m03, this.m13, this.m23, this.m33);
};

mat4.prototype.multiply = function(r) {
  // m00 m01 m02 m03     m00 m01 m02 m03
  // m10 m11 m12 m13     m10 m11 m12 m13
  // m20 m21 m22 m23  X  m20 m21 m22 m23
  // m30 m31 m32 m33     m30 m31 m32 m33
  return new mat4(
    (this.m00 * r.m00) + (this.m01 * r.m10) + (this.m02 * r.m20) + (this.m03 * r.m30),
    (this.m00 * r.m01) + (this.m01 * r.m11) + (this.m02 * r.m21) + (this.m03 * r.m31),
    (this.m00 * r.m02) + (this.m01 * r.m12) + (this.m02 * r.m22) + (this.m03 * r.m32),
    (this.m00 * r.m03) + (this.m01 * r.m13) + (this.m02 * r.m23) + (this.m03 * r.m33),
    (this.m10 * r.m00) + (this.m11 * r.m10) + (this.m12 * r.m20) + (this.m13 * r.m30),
    (this.m10 * r.m01) + (this.m11 * r.m11) + (this.m12 * r.m21) + (this.m13 * r.m31),
    (this.m10 * r.m02) + (this.m11 * r.m12) + (this.m12 * r.m22) + (this.m13 * r.m32),
    (this.m10 * r.m03) + (this.m11 * r.m13) + (this.m12 * r.m23) + (this.m13 * r.m33),
    (this.m20 * r.m00) + (this.m21 * r.m10) + (this.m22 * r.m20) + (this.m23 * r.m30),
    (this.m20 * r.m01) + (this.m21 * r.m11) + (this.m22 * r.m21) + (this.m23 * r.m31),
    (this.m20 * r.m02) + (this.m21 * r.m12) + (this.m22 * r.m22) + (this.m23 * r.m32),
    (this.m20 * r.m03) + (this.m21 * r.m13) + (this.m22 * r.m23) + (this.m23 * r.m33),
    (this.m30 * r.m00) + (this.m31 * r.m10) + (this.m32 * r.m20) + (this.m33 * r.m30),
    (this.m30 * r.m01) + (this.m31 * r.m11) + (this.m32 * r.m21) + (this.m33 * r.m31),
    (this.m30 * r.m02) + (this.m31 * r.m12) + (this.m32 * r.m22) + (this.m33 * r.m32),
    (this.m30 * r.m03) + (this.m31 * r.m13) + (this.m32 * r.m23) + (this.m33 * r.m33));
};

mat4.prototype.multiplyEquals = function(r) {
  // m00 m01 m02 m03     m00 m01 m02 m03
  // m10 m11 m12 m13     m10 m11 m12 m13
  // m20 m21 m22 m23  X  m20 m21 m22 m23
  // m30 m31 m32 m33     m30 m31 m32 m33
  this.m00 = (this.m00 * r.m00) + (this.m01 * r.m10) + (this.m02 * r.m20) + (this.m03 * r.m30);
  this.m01 = (this.m00 * r.m01) + (this.m01 * r.m11) + (this.m02 * r.m21) + (this.m03 * r.m31);
  this.m02 = (this.m00 * r.m02) + (this.m01 * r.m12) + (this.m02 * r.m22) + (this.m03 * r.m32);
  this.m03 = (this.m00 * r.m03) + (this.m01 * r.m13) + (this.m02 * r.m23) + (this.m03 * r.m33);
  this.m10 = (this.m10 * r.m00) + (this.m11 * r.m10) + (this.m12 * r.m20) + (this.m13 * r.m30);
  this.m11 = (this.m10 * r.m01) + (this.m11 * r.m11) + (this.m12 * r.m21) + (this.m13 * r.m31);
  this.m12 = (this.m10 * r.m02) + (this.m11 * r.m12) + (this.m12 * r.m22) + (this.m13 * r.m32);
  this.m13 = (this.m10 * r.m03) + (this.m11 * r.m13) + (this.m12 * r.m23) + (this.m13 * r.m33);
  this.m20 = (this.m20 * r.m00) + (this.m21 * r.m10) + (this.m22 * r.m20) + (this.m23 * r.m30);
  this.m21 = (this.m20 * r.m01) + (this.m21 * r.m11) + (this.m22 * r.m21) + (this.m23 * r.m31);
  this.m22 = (this.m20 * r.m02) + (this.m21 * r.m12) + (this.m22 * r.m22) + (this.m23 * r.m32);
  this.m23 = (this.m20 * r.m03) + (this.m21 * r.m13) + (this.m22 * r.m23) + (this.m23 * r.m33);
  this.m30 = (this.m30 * r.m00) + (this.m31 * r.m10) + (this.m32 * r.m20) + (this.m33 * r.m30);
  this.m31 = (this.m30 * r.m01) + (this.m31 * r.m11) + (this.m32 * r.m21) + (this.m33 * r.m31);
  this.m32 = (this.m30 * r.m02) + (this.m31 * r.m12) + (this.m32 * r.m22) + (this.m33 * r.m32);
  this.m33 = (this.m30 * r.m03) + (this.m31 * r.m13) + (this.m32 * r.m23) + (this.m33 * r.m33);
};

mat4.prototype.multiplyV2 = function(v) {
  // m00 m01 m02 m03     x
  // m10 m11 m12 m13     y
  // m20 m21 m22 m23  X
  // m30 m31 m32 m33
  return new vec2(
    this.m00 * v.x + this.m01 * v.y + this.m03,
    this.m10 * v.x + this.m11 * v.y + this.m13);
};

mat4.prototype.multiplyV3 = function(v) {
  // m00 m01 m02 m03     x
  // m10 m11 m12 m13     y
  // m20 m21 m22 m23  X  z
  // m30 m31 m32 m33
  return new vec3(
    this.m00 * v.x + this.m01 * v.y + this.m02 * v.z + this.m03,
    this.m10 * v.x + this.m11 * v.y + this.m12 * v.z + this.m13,
    this.m20 * v.x + this.m21 * v.y + this.m22 * v.z + this.m23);
};

mat4.prototype.multiplyV4 = function(v) {
  // m00 m01 m02 m03     x
  // m10 m11 m12 m13     y
  // m20 m21 m22 m23  X  z
  // m30 m31 m32 m33     w
  return new vec4(
    (this.m00 * v.x) + (this.m01 * v.y) + (this.m02 * v.z) + (this.m03 * v.w),
    (this.m10 * v.x) + (this.m11 * v.y) + (this.m12 * v.z) + (this.m13 * v.w),
    (this.m20 * v.x) + (this.m21 * v.y) + (this.m22 * v.z) + (this.m23 * v.w),
    (this.m30 * v.x) + (this.m31 * v.y) + (this.m32 * v.z) + (this.m33 * v.w));
};


//
// STATIC
//
mat4.perspective = function(l, r, b, t, n, f) {
  return new mat4(
    ((2*n)/(r-l)), 0,             ((r+l)/(r-l)),  0,
    0,             ((2*n)/(t-b)), ((t+b)/(t-b)),  0,
    0,             0,             (-(f+n)/(f-n)), ((-2*f*n)/(f-n)),
    0,             0,             -1,             0);
};

mat4.perspectiveAR = function(aspectRatio, fov, n, f) {
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

mat4.orthographicAR = function(aspectRatio, n, f) {
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
