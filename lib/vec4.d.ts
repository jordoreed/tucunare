export declare class vec4 {
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    toString(): string;
    set(x?: number, y?: number, z?: number, w?: number): this;
    copy(): vec4;
    add(x: number, y: number, z: number, w: number): vec4;
    addSelf(x: number, y: number, z: number, w: number): this;
    subtract(x: number, y: number, z: number, w: number): vec4;
    subtractSelf(x: number, y: number, z: number, w: number): this;
    scale(x: number, y?: number, z?: number, w?: number): vec4;
    scaleSelf(x: number, y?: number, z?: number, w?: number): this;
    divide(x: number, y?: number, z?: number, w?: number): vec4;
    divideSelf(x: number, y?: number, z?: number, w?: number): this;
    lerp(v: vec4, t: number): vec4;
    lerpSelf(v: vec4, t: number): this;
    dot(v: vec4): number;
}
