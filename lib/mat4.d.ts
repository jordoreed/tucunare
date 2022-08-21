import { vec2 } from './vec2';
import { vec3 } from './vec3';
import { vec4 } from './vec4';
export declare class mat4 {
    m: number[];
    constructor(...args: number[]);
    transpose(): mat4;
    copy(): mat4;
    multiply(r: mat4): mat4;
    multiplySelf(r: mat4): this;
    multiplyVec2(v: vec2): vec2;
    multiplyVec3(v: vec3): vec3;
    multiplyUpperLeftVec3(v: vec3): vec3;
    multiplyVec4(v: vec4): vec4;
    static identity(): mat4;
    static perspective(l: number, r: number, b: number, t: number, n: number, f: number): mat4;
    static perspectiveAspectRatio(aspectRatio: number, fov: number, n: number, f: number): mat4;
    static orthographic(l: number, r: number, b: number, t: number, n: number, f: number): mat4;
    static orthographicAspectRatio(aspectRatio: number, n: number, f: number): mat4;
    static translate(x: number, y: number, z: number): mat4;
    static scale(x: number, y: number, z: number): mat4;
    static rotateX(degrees: number): mat4;
    static rotateY(degrees: number): mat4;
    static rotateZ(degrees: number): mat4;
    static lookAt(pos: vec3, focus: vec3, up: vec3): mat4;
}
