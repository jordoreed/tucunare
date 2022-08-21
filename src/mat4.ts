import { toRadians } from './math';
import { vec2 } from './vec2';
import { vec3 } from './vec3';
import { vec4 } from './vec4';

export class mat4 {
  m: number[];

  constructor(...args: number[]) {
    if (args.length !== 16) {
      throw new Error('Expected 16 arguments in Mat4 constructor');
    }
    this.m = [...args];
  }

  transpose() {
    const { m } = this;
    return new mat4(
      m[0],
      m[4],
      m[8],
      m[12],
      m[1],
      m[5],
      m[9],
      m[13],
      m[2],
      m[6],
      m[10],
      m[14],
      m[3],
      m[7],
      m[11],
      m[15],
    );
  }

  copy() {
    const { m } = this;
    return new mat4(...m);
  }

  multiply(r: mat4) {
    // m00 m01 m02 m03     m00 m01 m02 m03
    // m04 m05 m06 m07  X  m04 m05 m06 m07
    // m08 m09 m10 m11     m08 m09 m10 m11
    // m12 m13 m14 m15     m12 m13 m14 m15
    const { m } = this;
    return new mat4(
      m[0] * r.m[0] + m[1] * r.m[4] + m[2] * r.m[8] + m[3] * r.m[12],
      m[0] * r.m[1] + m[1] * r.m[5] + m[2] * r.m[9] + m[3] * r.m[13],
      m[0] * r.m[2] + m[1] * r.m[6] + m[2] * r.m[10] + m[3] * r.m[14],
      m[0] * r.m[3] + m[1] * r.m[7] + m[2] * r.m[11] + m[3] * r.m[15],
      m[4] * r.m[0] + m[5] * r.m[4] + m[6] * r.m[8] + m[7] * r.m[12],
      m[4] * r.m[1] + m[5] * r.m[5] + m[6] * r.m[9] + m[7] * r.m[13],
      m[4] * r.m[2] + m[5] * r.m[6] + m[6] * r.m[10] + m[7] * r.m[14],
      m[4] * r.m[3] + m[5] * r.m[7] + m[6] * r.m[11] + m[7] * r.m[15],
      m[8] * r.m[0] + m[9] * r.m[4] + m[10] * r.m[8] + m[11] * r.m[12],
      m[8] * r.m[1] + m[9] * r.m[5] + m[10] * r.m[9] + m[11] * r.m[13],
      m[8] * r.m[2] + m[9] * r.m[6] + m[10] * r.m[10] + m[11] * r.m[14],
      m[8] * r.m[3] + m[9] * r.m[7] + m[10] * r.m[11] + m[11] * r.m[15],
      m[12] * r.m[0] + m[13] * r.m[4] + m[14] * r.m[8] + m[15] * r.m[12],
      m[12] * r.m[1] + m[13] * r.m[5] + m[14] * r.m[9] + m[15] * r.m[13],
      m[12] * r.m[2] + m[13] * r.m[6] + m[14] * r.m[10] + m[15] * r.m[14],
      m[12] * r.m[3] + m[13] * r.m[7] + m[14] * r.m[11] + m[15] * r.m[15],
    );
  }

  multiplySelf(r: mat4) {
    // m00 m01 m02 m03     m00 m01 m02 m03
    // m04 m05 m06 m07  X  m04 m05 m06 m07
    // m08 m09 m10 m11     m08 m09 m10 m11
    // m12 m13 m14 m15     m12 m13 m14 m15
    const { m } = this;
    m[0] = m[0] * r.m[0] + m[1] * r.m[4] + m[2] * r.m[8] + m[3] * r.m[12];
    m[1] = m[0] * r.m[1] + m[1] * r.m[5] + m[2] * r.m[9] + m[3] * r.m[13];
    m[2] = m[0] * r.m[2] + m[1] * r.m[6] + m[2] * r.m[10] + m[3] * r.m[14];
    m[3] = m[0] * r.m[3] + m[1] * r.m[7] + m[2] * r.m[11] + m[3] * r.m[15];
    m[4] = m[4] * r.m[0] + m[5] * r.m[4] + m[6] * r.m[8] + m[7] * r.m[12];
    m[5] = m[4] * r.m[1] + m[5] * r.m[5] + m[6] * r.m[9] + m[7] * r.m[13];
    m[6] = m[4] * r.m[2] + m[5] * r.m[6] + m[6] * r.m[10] + m[7] * r.m[14];
    m[7] = m[4] * r.m[3] + m[5] * r.m[7] + m[6] * r.m[11] + m[7] * r.m[15];
    m[8] = m[8] * r.m[0] + m[9] * r.m[4] + m[10] * r.m[8] + m[11] * r.m[12];
    m[9] = m[8] * r.m[1] + m[9] * r.m[5] + m[10] * r.m[9] + m[11] * r.m[13];
    m[10] = m[8] * r.m[2] + m[9] * r.m[6] + m[10] * r.m[10] + m[11] * r.m[14];
    m[11] = m[8] * r.m[3] + m[9] * r.m[7] + m[10] * r.m[11] + m[11] * r.m[15];
    m[12] = m[12] * r.m[0] + m[13] * r.m[4] + m[14] * r.m[8] + m[15] * r.m[12];
    m[13] = m[12] * r.m[1] + m[13] * r.m[5] + m[14] * r.m[9] + m[15] * r.m[13];
    m[14] = m[12] * r.m[2] + m[13] * r.m[6] + m[14] * r.m[10] + m[15] * r.m[14];
    m[15] = m[12] * r.m[3] + m[13] * r.m[7] + m[14] * r.m[11] + m[15] * r.m[15];
    return this;
  }

  multiplyVec2(v: vec2) {
    // m00 m01 m02 m03     x
    // m04 m05 m06 m07  X  y
    const { m } = this;
    return new vec2(
      m[0] * v.x + m[1] * v.y + m[3],
      m[4] * v.x + m[5] * v.y + m[7],
    );
  }

  multiplyVec3(v: vec3) {
    // m00 m01 m02 m03     x
    // m04 m05 m06 m07  X  y
    // m08 m09 m10 m11     z
    const { m } = this;
    return new vec3(
      m[0] * v.x + m[1] * v.y + m[2] * v.z + m[3],
      m[4] * v.x + m[5] * v.y + m[6] * v.z + m[7],
      m[8] * v.x + m[9] * v.y + m[10] * v.z + m[11],
    );
  }

  multiplyUpperLeftVec3(v: vec3) {
    // m00 m01 m02     x
    // m04 m05 m06  X  y
    // m08 m09 m10     z
    const { m } = this;
    return new vec3(
      m[0] * v.x + m[1] * v.y + m[2] * v.z,
      m[4] * v.x + m[5] * v.y + m[6] * v.z,
      m[8] * v.x + m[9] * v.y + m[10] * v.z,
    );
  }

  multiplyVec4(v: vec4) {
    // m00 m01 m02 m03     x
    // m04 m05 m06 m07  X  y
    // m08 m09 m10 m11     z
    // m12 m13 m14 m15     w
    const { m } = this;
    return new vec4(
      m[0] * v.x + m[1] * v.y + m[2] * v.z + m[3] * v.w,
      m[4] * v.x + m[5] * v.y + m[6] * v.z + m[7] * v.w,
      m[8] * v.x + m[9] * v.y + m[10] * v.z + m[11] * v.w,
      m[12] * v.x + m[13] * v.y + m[14] * v.z + m[15] * v.w,
    );
  }

  static identity() {
    return new mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  static perspective(
    l: number,
    r: number,
    b: number,
    t: number,
    n: number,
    f: number,
  ) {
    return new mat4(
      (2 * n) / (r - l),
      0,
      (r + l) / (r - l),
      0,
      0,
      (2 * n) / (t - b),
      (t + b) / (t - b),
      0,
      0,
      0,
      -(f + n) / (f - n),
      (-2 * f * n) / (f - n),
      0,
      0,
      -1,
      0,
    );
  }

  static perspectiveAspectRatio(
    aspectRatio: number,
    fov: number,
    n: number,
    f: number,
  ) {
    const halfH = Math.tan(toRadians(fov * 0.5)) * n;
    const halfW = aspectRatio * halfH;
    return mat4.perspective(-halfW, halfW, -halfH, halfH, n, f);
  }

  static orthographic(
    l: number,
    r: number,
    b: number,
    t: number,
    n: number,
    f: number,
  ) {
    return new mat4(
      2 / (r - l),
      0,
      0,
      -((r + l) / (r - l)),
      0,
      2 / (t - b),
      0,
      -((t + b) / (t - b)),
      0,
      0,
      -2 / (f - n),
      -((f + n) / (f - n)),
      0,
      0,
      0,
      1,
    );
  }

  static orthographicAspectRatio(aspectRatio: number, n: number, f: number) {
    let l: number;
    let r: number;
    let b: number;
    let t: number;
    if (aspectRatio <= 1) {
      l = -1;
      r = 1;
      t = 1.0 / aspectRatio;
      b = -t;
    } else {
      r = aspectRatio;
      l = -r;
      b = -1;
      t = 1;
    }
    return mat4.orthographic(l, r, t, b, n, f);
  }

  static translate(x: number, y: number, z: number) {
    return new mat4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
  }

  static scale(x: number, y: number, z: number) {
    return new mat4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
  }

  // pitch
  static rotateX(degrees: number) {
    const radians = toRadians(degrees);
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    return new mat4(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
  }

  // yaw
  static rotateY(degrees: number) {
    const radians = toRadians(degrees);
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    return new mat4(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
  }

  // roll
  static rotateZ(degrees: number) {
    const radians = toRadians(degrees);
    const c = Math.cos(radians);
    const s = Math.sin(radians);
    return new mat4(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  static lookAt(pos: vec3, focus: vec3, up: vec3) {
    const z = pos.copy().subtract(focus.x, focus.y, focus.z);
    z.normalize();
    const x = z.cross(up);
    x.normalize();
    const y = x.cross(z);
    y.normalize();

    const m1 = new mat4(
      x.x,
      x.y,
      x.z,
      0, // i
      y.x,
      y.y,
      y.z,
      0, // j
      z.x,
      z.y,
      z.z,
      0, // k
      0,
      0,
      0,
      1,
    );
    return m1.multiply(mat4.translate(-pos.x, -pos.y, -pos.z));
  }
}
