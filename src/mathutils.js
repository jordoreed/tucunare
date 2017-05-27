function MathUtils() { }

MathUtils.randomInt = function(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

MathUtils.randomFloat = function(min, max) {
  return (Math.random() * (max - min)) + min;
};

MathUtils.toRadians = function(degrees) {
  return degrees * Math.PI / 180.0;
};

MathUtils.toDegrees = function(radians) {
  return radians * 180.0 / Math.PI;
};

MathUtils.clamp = function(num, min, max) {
  return (num < min ? min : (num > high ? high : num));
};

MathUtils.lerp = function(a, b, percent) {
  return a + ((b - a) * percent);
};

MathUtils.lerpVec2 = function(a, b, percent) {
  return new vec2(
    MathUtils.lerp(a.x, b.x, percent),
    MathUtils.lerp(a.y, b.y, percent)
  );
};

MathUtils.lerpVec3 = function(a, b, percent) {
  return new vec3(
    MathUtils.lerp(a.x, b.x, percent),
    MathUtils.lerp(a.y, b.y, percent),
    MathUtils.lerp(a.z, b.z, percent)
  );
};

MathUtils.lerpVec4 = function(a, b, percent) {
  return new vec4(
    MathUtils.lerp(a.x, b.x, percent),
    MathUtils.lerp(a.y, b.y, percent),
    MathUtils.lerp(a.z, b.z, percent),
    MathUtils.lerp(a.w, b.w, percent)
  );
};