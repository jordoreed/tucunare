export declare class vec2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    toString(): string;
    set(x?: number, y?: number): this;
    copy(): vec2;
    add(x: number, y: number): vec2;
    addSelf(x: number, y: number): this;
    subtract(x: number, y: number): vec2;
    subtractSelf(x: number, y: number): this;
    scale(x: number, y?: number): void;
    scaleSelf(x: number, y?: number): this;
    divide(x: number, y?: number): vec2;
    divideSelf(x: number, y?: number): this;
    lerp(v: vec2, t: number): vec2;
    lerpSelf(v: vec2, t: number): this;
    normalize(): vec2;
    normalizeSelf(): this;
    reflect(normal: vec2): vec2;
    reflectSelf(normal: vec2): this;
    rotate(degrees: number, originX?: number, originY?: number): vec2;
    rotateSelf(degrees: number, originX?: number, originY?: number): this;
    dot(v: vec2): number;
    length(): number;
    distance(v: vec2): number;
    angle(v: vec2): number;
}
