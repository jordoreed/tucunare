"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mat4 = void 0;
var math_1 = require("./math");
var vec2_1 = require("./vec2");
var vec3_1 = require("./vec3");
var vec4_1 = require("./vec4");
var mat4 = /** @class */ (function () {
    function mat4() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length !== 16) {
            throw new Error('Expected 16 arguments in Mat4 constructor');
        }
        this.m = __spreadArray([], args, true);
    }
    mat4.prototype.transpose = function () {
        var m = this.m;
        return new mat4(m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]);
    };
    mat4.prototype.copy = function () {
        var m = this.m;
        return new (mat4.bind.apply(mat4, __spreadArray([void 0], m, false)))();
    };
    mat4.prototype.multiply = function (r) {
        // m00 m01 m02 m03     m00 m01 m02 m03
        // m04 m05 m06 m07  X  m04 m05 m06 m07
        // m08 m09 m10 m11     m08 m09 m10 m11
        // m12 m13 m14 m15     m12 m13 m14 m15
        var m = this.m;
        return new mat4(m[0] * r.m[0] + m[1] * r.m[4] + m[2] * r.m[8] + m[3] * r.m[12], m[0] * r.m[1] + m[1] * r.m[5] + m[2] * r.m[9] + m[3] * r.m[13], m[0] * r.m[2] + m[1] * r.m[6] + m[2] * r.m[10] + m[3] * r.m[14], m[0] * r.m[3] + m[1] * r.m[7] + m[2] * r.m[11] + m[3] * r.m[15], m[4] * r.m[0] + m[5] * r.m[4] + m[6] * r.m[8] + m[7] * r.m[12], m[4] * r.m[1] + m[5] * r.m[5] + m[6] * r.m[9] + m[7] * r.m[13], m[4] * r.m[2] + m[5] * r.m[6] + m[6] * r.m[10] + m[7] * r.m[14], m[4] * r.m[3] + m[5] * r.m[7] + m[6] * r.m[11] + m[7] * r.m[15], m[8] * r.m[0] + m[9] * r.m[4] + m[10] * r.m[8] + m[11] * r.m[12], m[8] * r.m[1] + m[9] * r.m[5] + m[10] * r.m[9] + m[11] * r.m[13], m[8] * r.m[2] + m[9] * r.m[6] + m[10] * r.m[10] + m[11] * r.m[14], m[8] * r.m[3] + m[9] * r.m[7] + m[10] * r.m[11] + m[11] * r.m[15], m[12] * r.m[0] + m[13] * r.m[4] + m[14] * r.m[8] + m[15] * r.m[12], m[12] * r.m[1] + m[13] * r.m[5] + m[14] * r.m[9] + m[15] * r.m[13], m[12] * r.m[2] + m[13] * r.m[6] + m[14] * r.m[10] + m[15] * r.m[14], m[12] * r.m[3] + m[13] * r.m[7] + m[14] * r.m[11] + m[15] * r.m[15]);
    };
    mat4.prototype.multiplySelf = function (r) {
        // m00 m01 m02 m03     m00 m01 m02 m03
        // m04 m05 m06 m07  X  m04 m05 m06 m07
        // m08 m09 m10 m11     m08 m09 m10 m11
        // m12 m13 m14 m15     m12 m13 m14 m15
        var m = this.m;
        m[0] = m[0] * r.m[0] + m[1] * r.m[4] + m[2] * r.m[8] + m[3] * r.m[12];
        m[1] = m[0] * r.m[1] + m[1] * r.m[5] + m[2] * r.m[9] + m[3] * r.m[13];
        m[2] = m[0] * r.m[2] + m[1] * r.m[6] + m[2] * r.m[10] + m[3] * r.m[14];
        m[3] = m[0] * r.m[3] + m[1] * r.m[7] + m[2] * r.m[11] + m[3] * r.m[15];
        m[4] = m[4] * r.m[0] + m[5] * r.m[4] + m[6] * r.m[8] + m[7] * r.m[12];
        m[5] = m[4] * r.m[1] + m[5] * r.m[5] + m[6] * r.m[9] + m[7] * r.m[13];
        m[6] = m[4] * r.m[2] + m[5] * r.m[6] + m[6] * r.m[10] + m[7] * r.m[14];
        m[7] = m[4] * r.m[3] + m[5] * r.m[7] + m[6] * r.m[11] + m[7] * r.m[15];
        m[8] = m[8] * r.m[0] + m[9] * r.m[4] + m[10] * r.m[8] + m[11] * r.m[12];
        m[9] = m[8] * r.m[1] + m[9] * r.m[5] + m[10] * r.m[9] + m[11] * r.m[13];
        m[10] = m[8] * r.m[2] + m[9] * r.m[6] + m[10] * r.m[10] + m[11] * r.m[14];
        m[11] = m[8] * r.m[3] + m[9] * r.m[7] + m[10] * r.m[11] + m[11] * r.m[15];
        m[12] = m[12] * r.m[0] + m[13] * r.m[4] + m[14] * r.m[8] + m[15] * r.m[12];
        m[13] = m[12] * r.m[1] + m[13] * r.m[5] + m[14] * r.m[9] + m[15] * r.m[13];
        m[14] = m[12] * r.m[2] + m[13] * r.m[6] + m[14] * r.m[10] + m[15] * r.m[14];
        m[15] = m[12] * r.m[3] + m[13] * r.m[7] + m[14] * r.m[11] + m[15] * r.m[15];
        return this;
    };
    mat4.prototype.multiplyVec2 = function (v) {
        // m00 m01 m02 m03     x
        // m04 m05 m06 m07  X  y
        var m = this.m;
        return new vec2_1.vec2(m[0] * v.x + m[1] * v.y + m[3], m[4] * v.x + m[5] * v.y + m[7]);
    };
    mat4.prototype.multiplyVec3 = function (v) {
        // m00 m01 m02 m03     x
        // m04 m05 m06 m07  X  y
        // m08 m09 m10 m11     z
        var m = this.m;
        return new vec3_1.vec3(m[0] * v.x + m[1] * v.y + m[2] * v.z + m[3], m[4] * v.x + m[5] * v.y + m[6] * v.z + m[7], m[8] * v.x + m[9] * v.y + m[10] * v.z + m[11]);
    };
    mat4.prototype.multiplyUpperLeftVec3 = function (v) {
        // m00 m01 m02     x
        // m04 m05 m06  X  y
        // m08 m09 m10     z
        var m = this.m;
        return new vec3_1.vec3(m[0] * v.x + m[1] * v.y + m[2] * v.z, m[4] * v.x + m[5] * v.y + m[6] * v.z, m[8] * v.x + m[9] * v.y + m[10] * v.z);
    };
    mat4.prototype.multiplyVec4 = function (v) {
        // m00 m01 m02 m03     x
        // m04 m05 m06 m07  X  y
        // m08 m09 m10 m11     z
        // m12 m13 m14 m15     w
        var m = this.m;
        return new vec4_1.vec4(m[0] * v.x + m[1] * v.y + m[2] * v.z + m[3] * v.w, m[4] * v.x + m[5] * v.y + m[6] * v.z + m[7] * v.w, m[8] * v.x + m[9] * v.y + m[10] * v.z + m[11] * v.w, m[12] * v.x + m[13] * v.y + m[14] * v.z + m[15] * v.w);
    };
    mat4.identity = function () {
        return new mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };
    mat4.perspective = function (l, r, b, t, n, f) {
        return new mat4((2 * n) / (r - l), 0, (r + l) / (r - l), 0, 0, (2 * n) / (t - b), (t + b) / (t - b), 0, 0, 0, -(f + n) / (f - n), (-2 * f * n) / (f - n), 0, 0, -1, 0);
    };
    mat4.perspectiveAspectRatio = function (aspectRatio, fov, n, f) {
        var halfH = Math.tan((0, math_1.toRadians)(fov * 0.5)) * n;
        var halfW = aspectRatio * halfH;
        return mat4.perspective(-halfW, halfW, -halfH, halfH, n, f);
    };
    mat4.orthographic = function (l, r, b, t, n, f) {
        return new mat4(2 / (r - l), 0, 0, -((r + l) / (r - l)), 0, 2 / (t - b), 0, -((t + b) / (t - b)), 0, 0, -2 / (f - n), -((f + n) / (f - n)), 0, 0, 0, 1);
    };
    mat4.orthographicAspectRatio = function (aspectRatio, n, f) {
        var l;
        var r;
        var b;
        var t;
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
    mat4.translate = function (x, y, z) {
        return new mat4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    };
    mat4.scale = function (x, y, z) {
        return new mat4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    };
    // pitch
    mat4.rotateX = function (degrees) {
        var radians = (0, math_1.toRadians)(degrees);
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        return new mat4(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    };
    // yaw
    mat4.rotateY = function (degrees) {
        var radians = (0, math_1.toRadians)(degrees);
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        return new mat4(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    };
    // roll
    mat4.rotateZ = function (degrees) {
        var radians = (0, math_1.toRadians)(degrees);
        var c = Math.cos(radians);
        var s = Math.sin(radians);
        return new mat4(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };
    mat4.lookAt = function (pos, focus, up) {
        var z = pos.copy().subtract(focus.x, focus.y, focus.z);
        z.normalize();
        var x = z.cross(up);
        x.normalize();
        var y = x.cross(z);
        y.normalize();
        var m1 = new mat4(x.x, x.y, x.z, 0, // i
        y.x, y.y, y.z, 0, // j
        z.x, z.y, z.z, 0, // k
        0, 0, 0, 1);
        return m1.multiply(mat4.translate(-pos.x, -pos.y, -pos.z));
    };
    return mat4;
}());
exports.mat4 = mat4;
