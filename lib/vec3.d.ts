export declare class vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    toString(): string;
    set(x?: number, y?: number, z?: number): this;
    copy(): vec3;
    add(x: number, y: number, z: number): vec3;
    addSelf(x: number, y: number, z: number): this;
    subtract(x: number, y: number, z: number): vec3;
    subtractSelf(x: number, y: number, z: number): this;
    scale(x: number, y?: number, z?: number): vec3;
    scaleSelf(x: number, y?: number, z?: number): this;
    divide(x: number, y?: number, z?: number): vec3;
    divideSelf(x: number, y?: number, z?: number): this;
    lerp(v: vec3, t: number): vec3;
    lerpSelf(v: vec3, t: number): this;
    dot(v: vec3): number;
    length(): number;
    distance(v: vec3): number;
    angle(v: vec3): number;
    cross(v: vec3): vec3;
    normalize(): vec3;
    normalizeSelf(): this;
}
