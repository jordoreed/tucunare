import { useEffect, useRef } from 'react';
import { Tucunare, mat4, vec4, randomFloat } from 'tucunare';
import { MAX_CANVAS_SIZE } from '../constants';

export const Points = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      canvas.width =
        window.innerWidth < MAX_CANVAS_SIZE
          ? window.innerWidth
          : MAX_CANVAS_SIZE;
      canvas.height =
        window.innerHeight < MAX_CANVAS_SIZE
          ? window.innerHeight
          : MAX_CANVAS_SIZE;
    };
    resizeCanvas();

    const tc = new Tucunare(canvas);
    tc.setClearColor(0, 0, 0, 1);

    let projectionMatrix: mat4;
    const camera = new vec4(0, 0, 100, 1);
    const viewMatrix = mat4.translate(-camera.x, -camera.y, -camera.z);
    let innerRotation = 0;
    let outerRotation = 0;

    const windowResized = () => {
      resizeCanvas();
      tc.resize();
      projectionMatrix = mat4.perspectiveAspectRatio(
        canvas.width / canvas.height,
        75,
        0.1,
        1000,
      );
    };
    window.onresize = windowResized;
    windowResized();

    const inner: vec4[] = [];
    const outer: vec4[] = [];
    const outerRadius = 50;
    const innerRadius = 20;
    const numInnerPoints = 200;
    const numOuterPoints = 1000;
    const totalPoints = numInnerPoints + numOuterPoints;
    const innerColor = new vec4(1, 1, 1, 1);
    const outerColor = new vec4(1, 0, 0, 1);
    for (let i = 0; i < totalPoints; i++) {
      let radius: number;
      let points: vec4[];
      if (i < numInnerPoints) {
        radius = innerRadius;
        points = inner;
      } else {
        radius = outerRadius;
        points = outer;
      }

      let point = new vec4(0, 0, radius, 1);
      point = mat4.rotateX(randomFloat(0, 360)).multiplyVec4(point);
      point = mat4.rotateY(randomFloat(0, 360)).multiplyVec4(point);
      point = mat4.rotateZ(randomFloat(0, 360)).multiplyVec4(point);
      points.push(point);
    }

    const draw = () => {
      tc.clear();

      const mvMatrix = projectionMatrix.multiply(viewMatrix);
      const mvpOuter = mvMatrix.multiply(mat4.rotateY(outerRotation));
      const mvpInner = mvMatrix.multiply(mat4.rotateY(innerRotation));

      // draw outer points
      tc.drawPoints(
        { point: outer },
        (input) => ({
          position: mvpOuter.multiplyVec4(input.point as vec4),
          outputs: {},
        }),
        () => outerColor,
      );

      // draw inner points
      tc.drawPoints(
        { point: inner },
        (input) => ({
          position: mvpInner.multiplyVec4(input.point as vec4),
          outputs: {},
        }),
        () => innerColor,
      );

      // flush the buffer to the canvas
      tc.flush();

      outerRotation = (outerRotation + 0.1) % 360;
      innerRotation = (innerRotation + 1) % 360;
    };

    const interval = setInterval(draw, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};
