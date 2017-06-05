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

if (typeof module !== "undefined" && module.exports) {
  module.exports = MathUtils;
  var vectorModule = require("../src/vector");
  vec2 = vectorModule.vec2;
  vec3 = vectorModule.vec3;
  vec4 = vectorModule.vec4;
}

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
  return (num < min ? min : (num > max ? max : num));
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