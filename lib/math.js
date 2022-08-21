"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerp = exports.clamp = exports.toDegrees = exports.toRadians = exports.randomFloat = exports.randomInt = void 0;
var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomInt = randomInt;
var randomFloat = function (min, max) {
    return Math.random() * (max - min) + min;
};
exports.randomFloat = randomFloat;
var toRadians = function (degrees) {
    return (degrees * Math.PI) / 180;
};
exports.toRadians = toRadians;
var toDegrees = function (radians) {
    return (radians * 180) / Math.PI;
};
exports.toDegrees = toDegrees;
var clamp = function (num, min, max) {
    if (num < min) {
        return min;
    }
    if (num > max) {
        return max;
    }
    return num;
};
exports.clamp = clamp;
var lerp = function (a, b, t) {
    return a + (b - a) * t;
};
exports.lerp = lerp;
