import { clamp } from './math';

export class vec2 {
  x = 0;
  y = 0;

  constructor(x = 0, y = 0) {
    this.set(x, y);
  }

  toString() {
    return `{ x: ${this.x}, y: ${this.y} }`;
  }

  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    return this;
  }

  copy() {
    return new vec2(this.x, this.y);
  }

  add(x: number, y: number) {
    return this.copy().addSelf(x, y);
  }

  addSelf(x: number, y: number) {
    return this.set(this.x + x, this.y + y);
  }

  subtract(x: number, y: number) {
    return this.copy().subtractSelf(x, y);
  }

  subtractSelf(x: number, y: number) {
    return this.set(this.x - x, this.y - y);
  }

  scale(x: number, y?: number) {
    return this.copy().scaleSelf(x, y);
  }

  scaleSelf(x: number, y?: number) {
    if (y === undefined || y === null) {
      y = x;
    }
    return this.set(this.x * x, this.y * y);
  }

  divide(x: number, y?: number) {
    return this.copy().divideSelf(x, y);
  }

  divideSelf(x: number, y?: number) {
    if (y === undefined || y === null) {
      y = x;
    }
    return this.set(this.x / x, this.y / y);
  }

  lerp(v: vec2, t: number) {
    return this.copy().lerpSelf(v, t);
  }

  lerpSelf(v: vec2, t: number) {
    return this.set(this.x + (v.x - this.x) * t, this.y + (v.y - this.y) * t);
  }

  normalize() {
    return this.copy().normalizeSelf();
  }

  normalizeSelf() {
    const magnitude = this.length();
    if (magnitude !== 0) {
      this.x /= magnitude;
      this.y /= magnitude;
    }
    return this;
  }

  reflect(normal: vec2) {
    return this.copy().reflectSelf(normal);
  }

  reflectSelf(normal: vec2) {
    const dot = normal.dot(this);
    return this.set(this.x - normal.x * 2 * dot, this.y - normal.y * 2 * dot);
  }

  rotate(degrees: number, originX = 0, originY = 0) {
    return this.copy().rotateSelf(degrees, originX, originY);
  }

  rotateSelf(degrees: number, originX = 0, originY = 0) {
    const cosA = Math.cos((Math.PI / 180.0) * degrees);
    const sinA = Math.sin((Math.PI / 180.0) * degrees);
    const minX = this.x - originX;
    const minY = this.y - originY;
    return this.set(
      minX * cosA - minY * sinA + originX,
      minX * sinA + minY * cosA + originY,
    );
  }

  dot(v: vec2) {
    return this.x * v.x + this.y * v.y;
  }

  length() {
    return Math.sqrt(this.dot(this));
  }

  distance(v: vec2) {
    return this.copy().subtract(v.x, v.y).length();
  }

  angle(v: vec2) {
    return Math.acos(clamp(this.dot(v), -1.0, 1.0));
  }
}
