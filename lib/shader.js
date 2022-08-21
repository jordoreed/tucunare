"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runVertexShader = exports.findLengthOfInputSources = void 0;
var findLengthOfInputSources = function (inputs) {
    var length = undefined;
    Object.keys(inputs).forEach(function (key) {
        if (length !== undefined && inputs[key].length !== length) {
            throw new Error('Input sources on vertex shader must be the same length');
        }
        length = inputs[key].length;
    });
    return length === undefined ? 0 : length;
};
exports.findLengthOfInputSources = findLengthOfInputSources;
var runVertexShader = function (inputs, index, shader) {
    var input = {};
    Object.keys(inputs).forEach(function (key) {
        input[key] = inputs[key][index];
    });
    return shader(input);
};
exports.runVertexShader = runVertexShader;
