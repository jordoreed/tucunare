export class vec4 {
  x = 0;
  y = 0;
  z = 0;
  w = 0;

  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  toString() {
    return `{ ${this.x}, ${this.y}, ${this.z}, ${this.w} }`;
  }

  set(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }

  copy() {
    return new vec4(this.x, this.y, this.z, this.w);
  }

  add(x: number, y: number, z: number, w: number) {
    return this.copy().addSelf(x, y, z, w);
  }

  addSelf(x: number, y: number, z: number, w: number) {
    return this.set(this.x + x, this.y + y, this.z + z, this.w + w);
  }

  subtract(x: number, y: number, z: number, w: number) {
    return this.copy().subtractSelf(x, y, z, w);
  }

  subtractSelf(x: number, y: number, z: number, w: number) {
    return this.set(this.x - x, this.y - y, this.z - z, this.w - w);
  }

  scale(x: number, y?: number, z?: number, w?: number) {
    return this.copy().scaleSelf(x, y, z, w);
  }

  scaleSelf(x: number, y?: number, z?: number, w?: number) {
    if (y === undefined) {
      y = x;
    }
    if (z === undefined) {
      z = x;
    }
    if (w === undefined) {
      w = x;
    }
    return this.set(this.x * x, this.y * y, this.z * z, this.w * w);
  }

  divide(x: number, y?: number, z?: number, w?: number) {
    return this.copy().divideSelf(x, y, z, w);
  }

  divideSelf(x: number, y?: number, z?: number, w?: number) {
    if (y === undefined) {
      y = x;
    }
    if (z === undefined) {
      z = x;
    }
    if (w === undefined) {
      w = x;
    }
    return this.set(this.x / x, this.y / y, this.z / z, this.w / w);
  }

  lerp(v: vec4, t: number) {
    return this.copy().lerpSelf(v, t);
  }

  lerpSelf(v: vec4, t: number) {
    return this.set(
      this.x + (v.x - this.x) * t,
      this.y + (v.y - this.y) * t,
      this.z + (v.z - this.z) * t,
      this.w + (v.w - this.w) * t,
    );
  }

  dot(v: vec4) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
}
