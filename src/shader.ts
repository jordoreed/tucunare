import { vec2 } from './vec2';
import { vec3 } from './vec3';
import { vec4 } from './vec4';

export type Varying = number | vec2 | vec3 | vec4;
export type VaryingValues = Record<string, Varying>;
export type VertexShaderInputs = Record<string, Varying[]>;

type VertexShaderResult = {
  position: vec4;
  outputs: VaryingValues;
};

export type VertexShader = (inputs: VaryingValues) => VertexShaderResult;

export type FragmentShader = (inputs: VaryingValues) => vec4;

export const findLengthOfInputSources = (inputs: VertexShaderInputs) => {
  let length: number | undefined = undefined;

  Object.keys(inputs).forEach((key) => {
    if (length !== undefined && inputs[key].length !== length) {
      throw new Error('Input sources on vertex shader must be the same length');
    }
    length = inputs[key].length;
  });

  return length === undefined ? 0 : length;
};

export const runVertexShader = (
  inputs: VertexShaderInputs,
  index: number,
  shader: VertexShader,
) => {
  const input: VaryingValues = {};
  Object.keys(inputs).forEach((key) => {
    input[key] = inputs[key][index];
  });
  return shader(input);
};
