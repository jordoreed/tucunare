export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomFloat = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const toDegrees = (radians: number) => {
  return (radians * 180) / Math.PI;
};

export const clamp = (num: number, min: number, max: number) => {
  if (num < min) {
    return min;
  }
  if (num > max) {
    return max;
  }
  return num;
};

export const lerp = (a: number, b: number, t: number) => {
  return a + (b - a) * t;
};
