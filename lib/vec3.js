"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec3 = void 0;
var math_1 = require("./math");
var vec3 = /** @class */ (function () {
    function vec3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.set(x, y, z);
    }
    vec3.prototype.toString = function () {
        return "{ ".concat(this.x, ", ").concat(this.y, ", ").concat(this.z, " }");
    };
    vec3.prototype.set = function (x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };
    vec3.prototype.copy = function () {
        return new vec3(this.x, this.y, this.z);
    };
    vec3.prototype.add = function (x, y, z) {
        return this.copy().addSelf(x, y, z);
    };
    vec3.prototype.addSelf = function (x, y, z) {
        return this.set(this.x + x, this.y + y, this.z + z);
    };
    vec3.prototype.subtract = function (x, y, z) {
        return this.copy().subtractSelf(x, y, z);
    };
    vec3.prototype.subtractSelf = function (x, y, z) {
        return this.set(this.x - x, this.y - y, this.z - z);
    };
    vec3.prototype.scale = function (x, y, z) {
        return this.copy().scaleSelf(x, y, z);
    };
    vec3.prototype.scaleSelf = function (x, y, z) {
        if (y === undefined) {
            y = x;
        }
        if (z === undefined) {
            z = x;
        }
        return this.set(this.x * x, this.y * y, this.z * z);
    };
    vec3.prototype.divide = function (x, y, z) {
        return this.copy().divideSelf(x, y, z);
    };
    vec3.prototype.divideSelf = function (x, y, z) {
        if (y === undefined) {
            y = x;
        }
        if (z === undefined) {
            z = x;
        }
        return this.set(this.x / x, this.y / y, this.z / z);
    };
    vec3.prototype.lerp = function (v, t) {
        return this.copy().lerpSelf(v, t);
    };
    vec3.prototype.lerpSelf = function (v, t) {
        return this.set(this.x + (v.x - this.x) * t, this.y + (v.y - this.y) * t, this.z + (v.z - this.z) * t);
    };
    vec3.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
    vec3.prototype.length = function () {
        return Math.sqrt(this.dot(this));
    };
    vec3.prototype.distance = function (v) {
        return this.copy().subtract(v.x, v.y, v.z).length();
    };
    vec3.prototype.angle = function (v) {
        return Math.acos((0, math_1.clamp)(this.dot(v), -1.0, 1.0));
    };
    vec3.prototype.cross = function (v) {
        return new vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    };
    vec3.prototype.normalize = function () {
        return this.copy().normalizeSelf();
    };
    vec3.prototype.normalizeSelf = function () {
        var magnitude = this.length();
        if (magnitude !== 0) {
            this.x /= magnitude;
            this.y /= magnitude;
            this.z /= magnitude;
        }
        return this;
    };
    return vec3;
}());
exports.vec3 = vec3;
