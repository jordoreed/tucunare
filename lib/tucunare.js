"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tucunare = void 0;
var math_1 = require("./math");
var shader_1 = require("./shader");
var vec2_1 = require("./vec2");
var vec3_1 = require("./vec3");
var vec4_1 = require("./vec4");
var FRUSTUM_PLANE_NORMALS = [
    new vec4_1.vec4(0, 0, 1, 1),
    new vec4_1.vec4(0, 0, -1, 1),
    new vec4_1.vec4(0, 1, 0, 1),
    new vec4_1.vec4(0, -1, 0, 1),
    new vec4_1.vec4(1, 0, 0, 1),
    new vec4_1.vec4(-1, 0, 0, 1),
];
var pointInFrustumPlane = function (point, planeIndex) {
    var normal = FRUSTUM_PLANE_NORMALS[planeIndex];
    return point.dot(normal) >= 0;
};
var pointInFrustum = function (point) {
    for (var i = 0; i < FRUSTUM_PLANE_NORMALS.length; i++) {
        if (!pointInFrustumPlane(point, i)) {
            return false;
        }
    }
    return true;
};
var getIntersectionInPlane = function (clip1, clip2, varying1, varying2, planeIndex) {
    var normal = FRUSTUM_PLANE_NORMALS[planeIndex];
    var t = clip1.dot(normal) /
        clip1.subtract(clip2.x, clip2.y, clip2.z, clip2.w).dot(normal);
    return {
        clip: clip1.lerp(clip2, t),
        varying: lerpVaryingValues(varying1, varying2, t),
    };
};
var lerpVaryingValues = function (varying1, varying2, t) {
    var result = {};
    Object.keys(varying1).forEach(function (key) {
        var a = varying1[key];
        var b = varying2[key];
        if (typeof a === 'number' && typeof b === 'number') {
            result[key] = (0, math_1.lerp)(a, b, t);
        }
        else if (a.constructor === vec2_1.vec2 && b.constructor === vec2_1.vec2) {
            result[key] = a.lerp(b, t);
        }
        else if (a.constructor === vec3_1.vec3 && b.constructor === vec3_1.vec3) {
            result[key] = a.lerp(b, t);
        }
        else if (a.constructor === vec4_1.vec4 && b.constructor === vec4_1.vec4) {
            result[key] = a.lerp(b, t);
        }
    });
    return result;
};
var findTwithW = function (w1, w2, t) {
    var distance = (0, math_1.lerp)(1.0 / w1, 1.0 / w2, t);
    var p = 1.0 / distance;
    return Math.abs((p - w1) / (w2 - w1));
};
var Tucunare = /** @class */ (function () {
    function Tucunare(canvas) {
        this.backFaceCullingEnabled = true;
        this.ndcToScreenIncrementX = 0;
        this.ndcToScreenIncrementY = 0;
        this.depthBuffer = [];
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.imageData = this.context.createImageData(this.canvas.width, this.canvas.height);
        this.resize();
    }
    Tucunare.prototype.resize = function () {
        this.ndcToScreenIncrementX = (this.canvas.width - 1) / 2.0;
        this.ndcToScreenIncrementY = (this.canvas.height - 1) / 2.0;
        this.clear();
    };
    Tucunare.prototype.setClearColor = function (r, g, b, a) {
        this.canvas.style.backgroundColor = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
    };
    Tucunare.prototype.clear = function () {
        this.imageData = this.context.createImageData(this.canvas.width, this.canvas.height);
        this.depthBuffer = [];
    };
    Tucunare.prototype.setPixel = function (screen, color) {
        if (screen.x < 0 ||
            screen.x >= this.canvas.width ||
            screen.y < 0 ||
            screen.y >= this.canvas.height) {
            console.log("Can't draw point out of bounds ".concat(JSON.stringify(screen), "."));
            return;
        }
        var x = screen.x;
        var y = this.canvas.height - 1 - screen.y;
        var offset = (Math.round(y) * this.canvas.width + Math.round(x)) * 4;
        var depth = this.depthBuffer[offset];
        if (depth === undefined || depth > screen.w) {
            this.depthBuffer[offset] = screen.w;
            this.imageData.data[offset] = color.x * 255;
            this.imageData.data[offset + 1] = color.y * 255;
            this.imageData.data[offset + 2] = color.z * 255;
            this.imageData.data[offset + 3] = color.w * 255;
        }
    };
    Tucunare.prototype.flush = function () {
        this.context.putImageData(this.imageData, 0, 0);
    };
    Tucunare.prototype.clipToNdc = function (point) {
        return new vec4_1.vec4(point.x / point.w, point.y / point.w, 0, point.w);
    };
    Tucunare.prototype.ndcToScreen = function (point) {
        return new vec4_1.vec4(Math.round((point.x + 1) * this.ndcToScreenIncrementX), Math.round((point.y + 1) * this.ndcToScreenIncrementY), 0, point.w);
    };
    Tucunare.prototype.drawPoints = function (inputs, vertShader, fragShader) {
        var length = (0, shader_1.findLengthOfInputSources)(inputs);
        for (var i = 0; i < length; i++) {
            var _a = (0, shader_1.runVertexShader)(inputs, i, vertShader), clip = _a.position, _b = _a.outputs, vsOutputs = _b === void 0 ? {} : _b;
            if (pointInFrustum(clip)) {
                var ndc = this.clipToNdc(clip);
                var screen_1 = this.ndcToScreen(ndc);
                var color = fragShader(vsOutputs);
                this.setPixel(screen_1, color);
            }
        }
    };
    Tucunare.prototype.drawLines = function (inputs, vertShader, fragShader) {
        var length = (0, shader_1.findLengthOfInputSources)(inputs);
        for (var i = 0; i < length; i += 2) {
            var _a = (0, shader_1.runVertexShader)(inputs, i, vertShader), clip1 = _a.position, _b = _a.outputs, vsOutputs1 = _b === void 0 ? {} : _b;
            var _c = (0, shader_1.runVertexShader)(inputs, i + 1, vertShader), clip2 = _c.position, _d = _c.outputs, vsOutputs2 = _d === void 0 ? {} : _d;
            var clipped = this.clipLine(clip1, clip2, vsOutputs1, vsOutputs2);
            if (clipped.length === 2) {
                var ndc1 = this.clipToNdc(clipped[0].clip);
                var ndc2 = this.clipToNdc(clipped[1].clip);
                var screen1 = this.ndcToScreen(ndc1);
                var screen2 = this.ndcToScreen(ndc2);
                this.drawScreenLine(screen1, screen2, clipped[0].varying, clipped[1].varying, fragShader);
            }
        }
    };
    Tucunare.prototype.clipLine = function (clip1, clip2, varying1, varying2) {
        var isVisible = true;
        for (var i = 0; i < FRUSTUM_PLANE_NORMALS.length; i++) {
            var clipIsIn1 = pointInFrustumPlane(clip1, i);
            var clipIsIn2 = pointInFrustumPlane(clip2, i);
            var bothIn = clipIsIn1 && clipIsIn2;
            var bothOut = !clipIsIn1 && !clipIsIn2;
            if (bothOut) {
                isVisible = false;
                break;
            }
            else if (!bothIn) {
                var clipped = getIntersectionInPlane(clip1, clip2, varying1, varying2, i);
                if (clipIsIn1) {
                    clip2 = clipped.clip;
                    varying2 = clipped.varying;
                }
                else {
                    clip1 = clipped.clip;
                    varying1 = clipped.varying;
                }
            }
        }
        return isVisible
            ? [
                { clip: clip1, varying: varying1 },
                { clip: clip2, varying: varying2 },
            ]
            : [];
    };
    Tucunare.prototype.drawScreenLine = function (screen1, screen2, varying1, varying2, fragShader, pixelArray) {
        var maxEdgeDistance = Math.max(Math.abs(screen1.x - screen2.x), Math.abs(screen1.y - screen2.y));
        if (maxEdgeDistance >= 0) {
            var increment = maxEdgeDistance > 0 ? 1.0 / maxEdgeDistance : 0;
            var sameDepth = screen1.w.toPrecision(3) === screen2.w.toPrecision(3);
            for (var i = 0; i <= maxEdgeDistance; i++) {
                var pixelT = increment * i;
                var varyingT = sameDepth
                    ? pixelT
                    : findTwithW(screen1.w, screen2.w, pixelT);
                var pixel = new vec4_1.vec4(Math.round((0, math_1.lerp)(screen1.x, screen2.x, pixelT)), Math.round((0, math_1.lerp)(screen1.y, screen2.y, pixelT)), 0, (0, math_1.lerp)(screen1.w, screen2.w, varyingT));
                var varying = lerpVaryingValues(varying1, varying2, varyingT);
                var color = fragShader(varying);
                if (pixelArray) {
                    pixelArray.push({ screen: pixel, varying: varying });
                }
                this.setPixel(pixel, color);
            }
        }
    };
    Tucunare.prototype.drawTriangles = function (inputs, vertShader, fragShader) {
        var length = (0, shader_1.findLengthOfInputSources)(inputs);
        for (var i = 0; i < length; i += 3) {
            var _a = (0, shader_1.runVertexShader)(inputs, i, vertShader), clip1 = _a.position, _b = _a.outputs, vsOut1 = _b === void 0 ? {} : _b;
            var _c = (0, shader_1.runVertexShader)(inputs, i + 1, vertShader), clip2 = _c.position, _d = _c.outputs, vsOut2 = _d === void 0 ? {} : _d;
            var _e = (0, shader_1.runVertexShader)(inputs, i + 2, vertShader), clip3 = _e.position, _f = _e.outputs, vsOut3 = _f === void 0 ? {} : _f;
            if (!this.backFaceCullingEnabled ||
                this.triangleIsForwardFacing(clip1, clip2, clip3)) {
                var clipped = this.clipTriangle(clip1, clip2, clip3, vsOut1, vsOut2, vsOut3);
                for (var j = 0; j < clipped.length; j += 3) {
                    var ndcUnsortedTriangle = [
                        {
                            ndc: this.clipToNdc(clipped[j].clip),
                            varying: clipped[j].varying,
                        },
                        {
                            ndc: this.clipToNdc(clipped[j + 1].clip),
                            varying: clipped[j + 1].varying,
                        },
                        {
                            ndc: this.clipToNdc(clipped[j + 2].clip),
                            varying: clipped[j + 2].varying,
                        },
                    ];
                    var ndcSortedTriangle = ndcUnsortedTriangle.sort(function (a, b) {
                        return a.ndc.y - b.ndc.y;
                    });
                    var bottom = ndcSortedTriangle[0];
                    var middle = ndcSortedTriangle[1];
                    var top_1 = ndcSortedTriangle[2];
                    this.drawTriangle(this.ndcToScreen(bottom.ndc), this.ndcToScreen(middle.ndc), this.ndcToScreen(top_1.ndc), bottom.varying, middle.varying, top_1.varying, fragShader);
                }
            }
        }
    };
    Tucunare.prototype.triangleIsForwardFacing = function (clip1, clip2, clip3) {
        var ndc1 = this.clipToNdc(clip1);
        var ndc2 = this.clipToNdc(clip2);
        var ndc3 = this.clipToNdc(clip3);
        var a = ndc2.subtract(ndc1.x, ndc1.y, ndc1.z, ndc1.w);
        var b = ndc3.subtract(ndc1.x, ndc1.y, ndc1.z, ndc1.w);
        var aV3 = new vec3_1.vec3(a.x, a.y, a.z);
        var bV3 = new vec3_1.vec3(b.x, b.y, b.z);
        var normalV3 = aV3.cross(bV3);
        return normalV3.z >= 0;
    };
    // https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm
    Tucunare.prototype.clipTriangle = function (clip1, clip2, clip3, varying1, varying2, varying3) {
        var outputList = [
            { clip: clip1, varying: varying1 },
            { clip: clip2, varying: varying2 },
            { clip: clip3, varying: varying3 },
        ];
        for (var planeIndex = 0; planeIndex < FRUSTUM_PLANE_NORMALS.length; planeIndex++) {
            if (outputList.length <= 0) {
                break;
            }
            var inputList = outputList;
            outputList = [];
            var previous = inputList[inputList.length - 1];
            var previousIsInPlane = pointInFrustumPlane(previous.clip, planeIndex);
            for (var i = 0; i < inputList.length; i++) {
                var current = inputList[i];
                var currentIsInPlane = pointInFrustumPlane(current.clip, planeIndex);
                if (currentIsInPlane) {
                    if (!previousIsInPlane) {
                        outputList.push(getIntersectionInPlane(current.clip, previous.clip, current.varying, previous.varying, planeIndex));
                    }
                    outputList.push(current);
                }
                else if (previousIsInPlane) {
                    outputList.push(getIntersectionInPlane(current.clip, previous.clip, current.varying, previous.varying, planeIndex));
                }
                previous = current;
                previousIsInPlane = currentIsInPlane;
            }
        }
        var numTriangles = outputList.length - 2;
        var clipped = [];
        for (var i = 0; i < numTriangles; i++) {
            clipped.push(outputList[0], outputList[i + 1], outputList[i + 2]);
        }
        return clipped;
    };
    Tucunare.prototype.drawTriangle = function (bottom, middle, top, bottomVarying, middleVarying, topVarying, fragShader) {
        var bt = [];
        var bm = [];
        var mt = [];
        this.drawScreenLine(bottom, top, bottomVarying, topVarying, fragShader, bt);
        this.drawScreenLine(bottom, middle, bottomVarying, middleVarying, fragShader, bm);
        this.drawScreenLine(middle, top, middleVarying, topVarying, fragShader, mt);
        var sides = this.getTriangleSides(bt, bm, mt);
        for (var i = 0; i < sides.left.length; i++) {
            var left = sides.left[i];
            var right = sides.right[i];
            this.drawScreenLine(left.screen, right.screen, left.varying, right.varying, fragShader);
        }
    };
    Tucunare.prototype.getTriangleSides = function (bt, bm, mt) {
        var one = bm.concat(mt);
        var two = bt;
        var left = [];
        var right = [];
        var bottomY = bt[0].screen.y;
        var topY = bt[bt.length - 1].screen.y;
        var index1 = 0;
        var index2 = 0;
        for (var y = bottomY; y <= topY; y++) {
            var currentPixels = [];
            while (index1 < one.length && one[index1].screen.y === y) {
                currentPixels.push(one[index1++]);
            }
            while (index2 < two.length && two[index2].screen.y === y) {
                currentPixels.push(two[index2++]);
            }
            // sort left to right
            currentPixels.sort(function (a, b) {
                return a.screen.x - b.screen.x;
            });
            if (currentPixels.length >= 1) {
                left.push(currentPixels[0]);
                right.push(currentPixels[currentPixels.length - 1]);
            }
        }
        return {
            left: left,
            right: right,
        };
    };
    return Tucunare;
}());
exports.Tucunare = Tucunare;
