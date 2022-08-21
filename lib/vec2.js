"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec2 = void 0;
var math_1 = require("./math");
var vec2 = /** @class */ (function () {
    function vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.set(x, y);
    }
    vec2.prototype.toString = function () {
        return "{ x: ".concat(this.x, ", y: ").concat(this.y, " }");
    };
    vec2.prototype.set = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        return this;
    };
    vec2.prototype.copy = function () {
        return new vec2(this.x, this.y);
    };
    vec2.prototype.add = function (x, y) {
        return this.copy().addSelf(x, y);
    };
    vec2.prototype.addSelf = function (x, y) {
        return this.set(this.x + x, this.y + y);
    };
    vec2.prototype.subtract = function (x, y) {
        return this.copy().subtractSelf(x, y);
    };
    vec2.prototype.subtractSelf = function (x, y) {
        return this.set(this.x - x, this.y - y);
    };
    vec2.prototype.scale = function (x, y) {
        this.copy().scaleSelf(x, y);
    };
    vec2.prototype.scaleSelf = function (x, y) {
        if (y === undefined || y === null) {
            y = x;
        }
        return this.set(this.x * x, this.y * y);
    };
    vec2.prototype.divide = function (x, y) {
        return this.copy().divideSelf(x, y);
    };
    vec2.prototype.divideSelf = function (x, y) {
        if (y === undefined || y === null) {
            y = x;
        }
        return this.set(this.x / x, this.y / y);
    };
    vec2.prototype.lerp = function (v, t) {
        return this.copy().lerpSelf(v, t);
    };
    vec2.prototype.lerpSelf = function (v, t) {
        return this.set(this.x + (v.x - this.x) * t, this.y + (v.y - this.y) * t);
    };
    vec2.prototype.normalize = function () {
        return this.copy().normalizeSelf();
    };
    vec2.prototype.normalizeSelf = function () {
        var magnitude = this.length();
        if (magnitude !== 0) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
        return this;
    };
    vec2.prototype.reflect = function (normal) {
        return this.copy().reflectSelf(normal);
    };
    vec2.prototype.reflectSelf = function (normal) {
        var dot = normal.dot(this);
        return this.set(this.x - normal.x * 2 * dot, this.y - normal.y * 2 * dot);
    };
    vec2.prototype.rotate = function (degrees, originX, originY) {
        if (originX === void 0) { originX = 0; }
        if (originY === void 0) { originY = 0; }
        return this.copy().rotateSelf(degrees, originX, originY);
    };
    vec2.prototype.rotateSelf = function (degrees, originX, originY) {
        if (originX === void 0) { originX = 0; }
        if (originY === void 0) { originY = 0; }
        var cosA = Math.cos((Math.PI / 180.0) * degrees);
        var sinA = Math.sin((Math.PI / 180.0) * degrees);
        var minX = this.x - originX;
        var minY = this.y - originY;
        return this.set(minX * cosA - minY * sinA + originX, minX * sinA + minY * cosA + originY);
    };
    vec2.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    vec2.prototype.length = function () {
        return Math.sqrt(this.dot(this));
    };
    vec2.prototype.distance = function (v) {
        return this.copy().subtract(v.x, v.y).length();
    };
    vec2.prototype.angle = function (v) {
        return Math.acos((0, math_1.clamp)(this.dot(v), -1.0, 1.0));
    };
    return vec2;
}());
exports.vec2 = vec2;
