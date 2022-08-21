import { FragmentShader, VaryingValues, VertexShader } from './shader';
import { vec4 } from './vec4';
declare type PixelArrayValue = {
    screen: vec4;
    varying: VaryingValues;
};
declare type PixelArray = Array<PixelArrayValue>;
export declare class Tucunare {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    backFaceCullingEnabled: boolean;
    ndcToScreenIncrementX: number;
    ndcToScreenIncrementY: number;
    depthBuffer: number[];
    imageData: ImageData;
    constructor(canvas: HTMLCanvasElement);
    resize(): void;
    setClearColor(r: number, g: number, b: number, a: number): void;
    clear(): void;
    setPixel(screen: vec4, color: vec4): void;
    flush(): void;
    clipToNdc(point: vec4): vec4;
    ndcToScreen(point: vec4): vec4;
    drawPoints(inputs: Record<string, vec4[]>, vertShader: VertexShader, fragShader: FragmentShader): void;
    drawLines(inputs: Record<string, vec4[]>, vertShader: VertexShader, fragShader: FragmentShader): void;
    clipLine(clip1: vec4, clip2: vec4, varying1: VaryingValues, varying2: VaryingValues): {
        clip: vec4;
        varying: VaryingValues;
    }[];
    drawScreenLine(screen1: vec4, screen2: vec4, varying1: VaryingValues, varying2: VaryingValues, fragShader: FragmentShader, pixelArray?: PixelArray): void;
    drawTriangles(inputs: Record<string, vec4[]>, vertShader: VertexShader, fragShader: FragmentShader): void;
    triangleIsForwardFacing(clip1: vec4, clip2: vec4, clip3: vec4): boolean;
    clipTriangle(clip1: vec4, clip2: vec4, clip3: vec4, varying1: VaryingValues, varying2: VaryingValues, varying3: VaryingValues): {
        clip: vec4;
        varying: VaryingValues;
    }[];
    drawTriangle(bottom: vec4, middle: vec4, top: vec4, bottomVarying: VaryingValues, middleVarying: VaryingValues, topVarying: VaryingValues, fragShader: FragmentShader): void;
    getTriangleSides(bt: PixelArray, bm: PixelArray, mt: PixelArray): {
        left: PixelArray;
        right: PixelArray;
    };
}
export {};
