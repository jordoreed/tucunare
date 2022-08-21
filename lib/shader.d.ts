import { vec2 } from './vec2';
import { vec3 } from './vec3';
import { vec4 } from './vec4';
export declare type Varying = number | vec2 | vec3 | vec4;
export declare type VaryingValues = Record<string, Varying>;
export declare type VertexShaderInputs = Record<string, Varying[]>;
declare type VertexShaderResult = {
    position: vec4;
    outputs: VaryingValues;
};
export declare type VertexShader = (inputs: VaryingValues) => VertexShaderResult;
export declare type FragmentShader = (inputs: VaryingValues) => vec4;
export declare const findLengthOfInputSources: (inputs: VertexShaderInputs) => number;
export declare const runVertexShader: (inputs: VertexShaderInputs, index: number, shader: VertexShader) => VertexShaderResult;
export {};
