"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec4 = void 0;
var vec4 = /** @class */ (function () {
    function vec4(x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    vec4.prototype.toString = function () {
        return "{ ".concat(this.x, ", ").concat(this.y, ", ").concat(this.z, ", ").concat(this.w, " }");
    };
    vec4.prototype.set = function (x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    };
    vec4.prototype.copy = function () {
        return new vec4(this.x, this.y, this.z, this.w);
    };
    vec4.prototype.add = function (x, y, z, w) {
        return this.copy().addSelf(x, y, z, w);
    };
    vec4.prototype.addSelf = function (x, y, z, w) {
        return this.set(this.x + x, this.y + y, this.z + z, this.w + w);
    };
    vec4.prototype.subtract = function (x, y, z, w) {
        return this.copy().subtractSelf(x, y, z, w);
    };
    vec4.prototype.subtractSelf = function (x, y, z, w) {
        return this.set(this.x - x, this.y - y, this.z - z, this.w - w);
    };
    vec4.prototype.scale = function (x, y, z, w) {
        return this.copy().scaleSelf(x, y, z, w);
    };
    vec4.prototype.scaleSelf = function (x, y, z, w) {
        if (y === undefined) {
            y = x;
        }
        if (z === undefined) {
            z = x;
        }
        if (w === undefined) {
            w = x;
        }
        return this.set(this.x * x, this.y * y, this.z * z, this.w * w);
    };
    vec4.prototype.divide = function (x, y, z, w) {
        return this.copy().divideSelf(x, y, z, w);
    };
    vec4.prototype.divideSelf = function (x, y, z, w) {
        if (y === undefined) {
            y = x;
        }
        if (z === undefined) {
            z = x;
        }
        if (w === undefined) {
            w = x;
        }
        return this.set(this.x / x, this.y / y, this.z / z, this.w / w);
    };
    vec4.prototype.lerp = function (v, t) {
        return this.copy().lerpSelf(v, t);
    };
    vec4.prototype.lerpSelf = function (v, t) {
        return this.set(this.x + (v.x - this.x) * t, this.y + (v.y - this.y) * t, this.z + (v.z - this.z) * t, this.w + (v.w - this.w) * t);
    };
    vec4.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    };
    return vec4;
}());
exports.vec4 = vec4;
