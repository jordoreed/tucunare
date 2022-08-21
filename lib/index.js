"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec2 = exports.vec3 = exports.vec4 = exports.mat4 = exports.Tucunare = void 0;
var tucunare_1 = require("./tucunare");
Object.defineProperty(exports, "Tucunare", { enumerable: true, get: function () { return tucunare_1.Tucunare; } });
var mat4_1 = require("./mat4");
Object.defineProperty(exports, "mat4", { enumerable: true, get: function () { return mat4_1.mat4; } });
var vec4_1 = require("./vec4");
Object.defineProperty(exports, "vec4", { enumerable: true, get: function () { return vec4_1.vec4; } });
var vec3_1 = require("./vec3");
Object.defineProperty(exports, "vec3", { enumerable: true, get: function () { return vec3_1.vec3; } });
var vec2_1 = require("./vec2");
Object.defineProperty(exports, "vec2", { enumerable: true, get: function () { return vec2_1.vec2; } });
__exportStar(require("./math"), exports);
