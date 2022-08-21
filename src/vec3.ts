import { clamp } from './math';

export class vec3 {
  x = 0;
  y = 0;
  z = 0;

  constructor(x = 0, y = 0, z = 0) {
    this.set(x, y, z);
  }

  toString() {
    return `{ ${this.x}, ${this.y}, ${this.z} }`;
  }

  set(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  copy() {
    return new vec3(this.x, this.y, this.z);
  }

  add(x: number, y: number, z: number) {
    return this.copy().addSelf(x, y, z);
  }

  addSelf(x: number, y: number, z: number) {
    return this.set(this.x + x, this.y + y, this.z + z);
  }

  subtract(x: number, y: number, z: number) {
    return this.copy().subtractSelf(x, y, z);
  }

  subtractSelf(x: number, y: number, z: number) {
    return this.set(this.x - x, this.y - y, this.z - z);
  }

  scale(x: number, y?: number, z?: number) {
    return this.copy().scaleSelf(x, y, z);
  }

  scaleSelf(x: number, y?: number, z?: number) {
    if (y === undefined) {
      y = x;
    }
    if (z === undefined) {
      z = x;
    }
    return this.set(this.x * x, this.y * y, this.z * z);
  }

  divide(x: number, y?: number, z?: number) {
    return this.copy().divideSelf(x, y, z);
  }

  divideSelf(x: number, y?: number, z?: number) {
    if (y === undefined) {
      y = x;
    }
    if (z === undefined) {
      z = x;
    }
    return this.set(this.x / x, this.y / y, this.z / z);
  }

  lerp(v: vec3, t: number) {
    return this.copy().lerpSelf(v, t);
  }

  lerpSelf(v: vec3, t: number) {
    return this.set(
      this.x + (v.x - this.x) * t,
      this.y + (v.y - this.y) * t,
      this.z + (v.z - this.z) * t,
    );
  }

  dot(v: vec3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  length() {
    return Math.sqrt(this.dot(this));
  }

  distance(v: vec3) {
    return this.copy().subtract(v.x, v.y, v.z).length();
  }

  angle(v: vec3) {
    return Math.acos(clamp(this.dot(v), -1.0, 1.0));
  }

  cross(v: vec3) {
    return new vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
    );
  }

  normalize() {
    return this.copy().normalizeSelf();
  }

  normalizeSelf() {
    const magnitude = this.length();
    if (magnitude !== 0) {
      this.x /= magnitude;
      this.y /= magnitude;
      this.z /= magnitude;
    }
    return this;
  }
}
