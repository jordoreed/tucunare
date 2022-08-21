import { lerp } from './math';
import {
  findLengthOfInputSources,
  FragmentShader,
  runVertexShader,
  VaryingValues,
  VertexShader,
} from './shader';
import { vec2 } from './vec2';
import { vec3 } from './vec3';
import { vec4 } from './vec4';

const FRUSTUM_PLANE_NORMALS = [
  new vec4(0, 0, 1, 1),
  new vec4(0, 0, -1, 1),
  new vec4(0, 1, 0, 1),
  new vec4(0, -1, 0, 1),
  new vec4(1, 0, 0, 1),
  new vec4(-1, 0, 0, 1),
];

type PixelArrayValue = { screen: vec4; varying: VaryingValues };
type PixelArray = Array<PixelArrayValue>;

const pointInFrustumPlane = (point: vec4, planeIndex: number) => {
  const normal = FRUSTUM_PLANE_NORMALS[planeIndex];
  return point.dot(normal) >= 0;
};

const pointInFrustum = (point: vec4) => {
  for (let i = 0; i < FRUSTUM_PLANE_NORMALS.length; i++) {
    if (!pointInFrustumPlane(point, i)) {
      return false;
    }
  }
  return true;
};

const getIntersectionInPlane = (
  clip1: vec4,
  clip2: vec4,
  varying1: VaryingValues,
  varying2: VaryingValues,
  planeIndex: number,
) => {
  const normal = FRUSTUM_PLANE_NORMALS[planeIndex];
  const t =
    clip1.dot(normal) /
    clip1.subtract(clip2.x, clip2.y, clip2.z, clip2.w).dot(normal);
  return {
    clip: clip1.lerp(clip2, t),
    varying: lerpVaryingValues(varying1, varying2, t),
  };
};

const lerpVaryingValues = (
  varying1: VaryingValues,
  varying2: VaryingValues,
  t: number,
) => {
  const result: VaryingValues = {};

  Object.keys(varying1).forEach((key) => {
    const a = varying1[key];
    const b = varying2[key];
    if (typeof a === 'number' && typeof b === 'number') {
      result[key] = lerp(a, b, t);
    } else if (a.constructor === vec2 && b.constructor === vec2) {
      result[key] = a.lerp(b, t);
    } else if (a.constructor === vec3 && b.constructor === vec3) {
      result[key] = a.lerp(b, t);
    } else if (a.constructor === vec4 && b.constructor === vec4) {
      result[key] = a.lerp(b, t);
    }
  });

  return result;
};

const findTwithW = (w1: number, w2: number, t: number) => {
  const distance = lerp(1.0 / w1, 1.0 / w2, t);
  const p = 1.0 / distance;
  return Math.abs((p - w1) / (w2 - w1));
};

export class Tucunare {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  backFaceCullingEnabled = true;
  ndcToScreenIncrementX = 0;
  ndcToScreenIncrementY = 0;
  depthBuffer: number[] = [];
  imageData: ImageData;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.imageData = this.context.createImageData(
      this.canvas.width,
      this.canvas.height,
    );
    this.resize();
  }

  resize() {
    this.ndcToScreenIncrementX = (this.canvas.width - 1) / 2.0;
    this.ndcToScreenIncrementY = (this.canvas.height - 1) / 2.0;
    this.clear();
  }

  setClearColor(r: number, g: number, b: number, a: number) {
    this.canvas.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  clear() {
    this.imageData = this.context.createImageData(
      this.canvas.width,
      this.canvas.height,
    );
    this.depthBuffer = [];
  }

  setPixel(screen: vec4, color: vec4) {
    if (
      screen.x < 0 ||
      screen.x >= this.canvas.width ||
      screen.y < 0 ||
      screen.y >= this.canvas.height
    ) {
      console.log(`Can't draw point out of bounds ${JSON.stringify(screen)}.`);
      return;
    }

    const x = screen.x;
    const y = this.canvas.height - 1 - screen.y;
    const offset = (Math.round(y) * this.canvas.width + Math.round(x)) * 4;
    const depth = this.depthBuffer[offset];

    if (depth === undefined || depth > screen.w) {
      this.depthBuffer[offset] = screen.w;
      this.imageData.data[offset] = color.x * 255;
      this.imageData.data[offset + 1] = color.y * 255;
      this.imageData.data[offset + 2] = color.z * 255;
      this.imageData.data[offset + 3] = color.w * 255;
    }
  }

  flush() {
    this.context.putImageData(this.imageData, 0, 0);
  }

  clipToNdc(point: vec4) {
    return new vec4(point.x / point.w, point.y / point.w, 0, point.w);
  }

  ndcToScreen(point: vec4) {
    return new vec4(
      Math.round((point.x + 1) * this.ndcToScreenIncrementX),
      Math.round((point.y + 1) * this.ndcToScreenIncrementY),
      0,
      point.w,
    );
  }

  drawPoints(
    inputs: Record<string, vec4[]>,
    vertShader: VertexShader,
    fragShader: FragmentShader,
  ) {
    const length = findLengthOfInputSources(inputs);

    for (let i = 0; i < length; i++) {
      const { position: clip, outputs: vsOutputs = {} } = runVertexShader(
        inputs,
        i,
        vertShader,
      );

      if (pointInFrustum(clip)) {
        const ndc = this.clipToNdc(clip);
        const screen = this.ndcToScreen(ndc);
        const color = fragShader(vsOutputs);
        this.setPixel(screen, color);
      }
    }
  }

  drawLines(
    inputs: Record<string, vec4[]>,
    vertShader: VertexShader,
    fragShader: FragmentShader,
  ) {
    const length = findLengthOfInputSources(inputs);

    for (let i = 0; i < length; i += 2) {
      const { position: clip1, outputs: vsOutputs1 = {} } = runVertexShader(
        inputs,
        i,
        vertShader,
      );
      const { position: clip2, outputs: vsOutputs2 = {} } = runVertexShader(
        inputs,
        i + 1,
        vertShader,
      );

      const clipped = this.clipLine(clip1, clip2, vsOutputs1, vsOutputs2);
      if (clipped.length === 2) {
        const ndc1 = this.clipToNdc(clipped[0].clip);
        const ndc2 = this.clipToNdc(clipped[1].clip);
        const screen1 = this.ndcToScreen(ndc1);
        const screen2 = this.ndcToScreen(ndc2);
        this.drawScreenLine(
          screen1,
          screen2,
          clipped[0].varying,
          clipped[1].varying,
          fragShader,
        );
      }
    }
  }

  clipLine(
    clip1: vec4,
    clip2: vec4,
    varying1: VaryingValues,
    varying2: VaryingValues,
  ) {
    let isVisible = true;

    for (let i = 0; i < FRUSTUM_PLANE_NORMALS.length; i++) {
      const clipIsIn1 = pointInFrustumPlane(clip1, i);
      const clipIsIn2 = pointInFrustumPlane(clip2, i);
      const bothIn = clipIsIn1 && clipIsIn2;
      const bothOut = !clipIsIn1 && !clipIsIn2;

      if (bothOut) {
        isVisible = false;
        break;
      } else if (!bothIn) {
        const clipped = getIntersectionInPlane(
          clip1,
          clip2,
          varying1,
          varying2,
          i,
        );
        if (clipIsIn1) {
          clip2 = clipped.clip;
          varying2 = clipped.varying;
        } else {
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
  }

  drawScreenLine(
    screen1: vec4,
    screen2: vec4,
    varying1: VaryingValues,
    varying2: VaryingValues,
    fragShader: FragmentShader,
    pixelArray?: PixelArray,
  ) {
    const maxEdgeDistance = Math.max(
      Math.abs(screen1.x - screen2.x),
      Math.abs(screen1.y - screen2.y),
    );
    if (maxEdgeDistance >= 0) {
      const increment = maxEdgeDistance > 0 ? 1.0 / maxEdgeDistance : 0;
      const sameDepth = screen1.w.toPrecision(3) === screen2.w.toPrecision(3);
      for (let i = 0; i <= maxEdgeDistance; i++) {
        const pixelT = increment * i;
        const varyingT = sameDepth
          ? pixelT
          : findTwithW(screen1.w, screen2.w, pixelT);

        const pixel = new vec4(
          Math.round(lerp(screen1.x, screen2.x, pixelT)),
          Math.round(lerp(screen1.y, screen2.y, pixelT)),
          0,
          lerp(screen1.w, screen2.w, varyingT),
        );
        const varying = lerpVaryingValues(varying1, varying2, varyingT);
        const color = fragShader(varying);

        if (pixelArray) {
          pixelArray.push({ screen: pixel, varying: varying });
        }
        this.setPixel(pixel, color);
      }
    }
  }

  drawTriangles(
    inputs: Record<string, vec4[]>,
    vertShader: VertexShader,
    fragShader: FragmentShader,
  ) {
    const length = findLengthOfInputSources(inputs);
    for (let i = 0; i < length; i += 3) {
      const { position: clip1, outputs: vsOut1 = {} } = runVertexShader(
        inputs,
        i,
        vertShader,
      );
      const { position: clip2, outputs: vsOut2 = {} } = runVertexShader(
        inputs,
        i + 1,
        vertShader,
      );
      const { position: clip3, outputs: vsOut3 = {} } = runVertexShader(
        inputs,
        i + 2,
        vertShader,
      );

      if (
        !this.backFaceCullingEnabled ||
        this.triangleIsForwardFacing(clip1, clip2, clip3)
      ) {
        const clipped = this.clipTriangle(
          clip1,
          clip2,
          clip3,
          vsOut1,
          vsOut2,
          vsOut3,
        );
        for (let j = 0; j < clipped.length; j += 3) {
          const ndcUnsortedTriangle = [
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
          const ndcSortedTriangle = ndcUnsortedTriangle.sort(function (a, b) {
            return a.ndc.y - b.ndc.y;
          });
          const bottom = ndcSortedTriangle[0];
          const middle = ndcSortedTriangle[1];
          const top = ndcSortedTriangle[2];
          this.drawTriangle(
            this.ndcToScreen(bottom.ndc),
            this.ndcToScreen(middle.ndc),
            this.ndcToScreen(top.ndc),
            bottom.varying,
            middle.varying,
            top.varying,
            fragShader,
          );
        }
      }
    }
  }

  triangleIsForwardFacing(clip1: vec4, clip2: vec4, clip3: vec4) {
    const ndc1 = this.clipToNdc(clip1);
    const ndc2 = this.clipToNdc(clip2);
    const ndc3 = this.clipToNdc(clip3);
    const a = ndc2.subtract(ndc1.x, ndc1.y, ndc1.z, ndc1.w);
    const b = ndc3.subtract(ndc1.x, ndc1.y, ndc1.z, ndc1.w);
    const aV3 = new vec3(a.x, a.y, a.z);
    const bV3 = new vec3(b.x, b.y, b.z);
    const normalV3 = aV3.cross(bV3);
    return normalV3.z >= 0;
  }

  // https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm
  clipTriangle(
    clip1: vec4,
    clip2: vec4,
    clip3: vec4,
    varying1: VaryingValues,
    varying2: VaryingValues,
    varying3: VaryingValues,
  ) {
    let outputList = [
      { clip: clip1, varying: varying1 },
      { clip: clip2, varying: varying2 },
      { clip: clip3, varying: varying3 },
    ];

    for (
      let planeIndex = 0;
      planeIndex < FRUSTUM_PLANE_NORMALS.length;
      planeIndex++
    ) {
      if (outputList.length <= 0) {
        break;
      }

      const inputList = outputList;
      outputList = [];
      let previous = inputList[inputList.length - 1];
      let previousIsInPlane = pointInFrustumPlane(previous.clip, planeIndex);

      for (let i = 0; i < inputList.length; i++) {
        const current = inputList[i];
        const currentIsInPlane = pointInFrustumPlane(current.clip, planeIndex);

        if (currentIsInPlane) {
          if (!previousIsInPlane) {
            outputList.push(
              getIntersectionInPlane(
                current.clip,
                previous.clip,
                current.varying,
                previous.varying,
                planeIndex,
              ),
            );
          }
          outputList.push(current);
        } else if (previousIsInPlane) {
          outputList.push(
            getIntersectionInPlane(
              current.clip,
              previous.clip,
              current.varying,
              previous.varying,
              planeIndex,
            ),
          );
        }

        previous = current;
        previousIsInPlane = currentIsInPlane;
      }
    }

    const numTriangles = outputList.length - 2;
    const clipped: Array<{ clip: vec4; varying: VaryingValues }> = [];
    for (let i = 0; i < numTriangles; i++) {
      clipped.push(outputList[0], outputList[i + 1], outputList[i + 2]);
    }
    return clipped;
  }

  drawTriangle(
    bottom: vec4,
    middle: vec4,
    top: vec4,
    bottomVarying: VaryingValues,
    middleVarying: VaryingValues,
    topVarying: VaryingValues,
    fragShader: FragmentShader,
  ) {
    const bt: PixelArray = [];
    const bm: PixelArray = [];
    const mt: PixelArray = [];
    this.drawScreenLine(bottom, top, bottomVarying, topVarying, fragShader, bt);
    this.drawScreenLine(
      bottom,
      middle,
      bottomVarying,
      middleVarying,
      fragShader,
      bm,
    );
    this.drawScreenLine(middle, top, middleVarying, topVarying, fragShader, mt);

    const sides = this.getTriangleSides(bt, bm, mt);
    for (let i = 0; i < sides.left.length; i++) {
      const left = sides.left[i];
      const right = sides.right[i];
      this.drawScreenLine(
        left.screen,
        right.screen,
        left.varying,
        right.varying,
        fragShader,
      );
    }
  }

  getTriangleSides(bt: PixelArray, bm: PixelArray, mt: PixelArray) {
    const one = bm.concat(mt);
    const two = bt;
    const left: PixelArray = [];
    const right: PixelArray = [];
    const bottomY = bt[0].screen.y;
    const topY = bt[bt.length - 1].screen.y;

    let index1 = 0;
    let index2 = 0;
    for (let y = bottomY; y <= topY; y++) {
      const currentPixels = [];
      while (index1 < one.length && one[index1].screen.y === y) {
        currentPixels.push(one[index1++]);
      }
      while (index2 < two.length && two[index2].screen.y === y) {
        currentPixels.push(two[index2++]);
      }

      // sort left to right
      currentPixels.sort((a, b) => {
        return a.screen.x - b.screen.x;
      });

      if (currentPixels.length >= 1) {
        left.push(currentPixels[0]);
        right.push(currentPixels[currentPixels.length - 1]);
      }
    }

    return {
      left,
      right,
    };
  }
}
