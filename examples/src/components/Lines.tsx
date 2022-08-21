import { useEffect, useRef } from 'react';
import { Tucunare, mat4, vec4 } from 'tucunare';
import { MAX_CANVAS_SIZE } from '../constants';

export const Lines = () => {
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
    const camera = new vec4(0, 0, 10, 1);
    const viewMatrix = mat4.translate(-camera.x, -camera.y, -camera.z);
    let rotation = 0;

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

    const points: vec4[] = [];
    const colors: vec4[] = [];
    const height = 10;
    const numSegments = 64;
    const startColor = new vec4(1, 0, 0, 1);
    const endColor = new vec4(0, 0.8, 1, 1);
    const current = {
      point: new vec4(1, -height / 2, 0, 1),
      color: new vec4(),
    };

    let previousPoint: vec4 | undefined;
    let previousColor: vec4 | undefined;
    for (let i = 0; i < numSegments; i++) {
      current.point = mat4.rotateY(360 / 16).multiplyVec4(current.point);
      current.point = mat4
        .translate(0, height / numSegments, 0)
        .multiplyVec4(current.point);
      current.color = startColor.copy().lerp(endColor, i / numSegments);
      if (previousPoint && previousColor) {
        points.push(previousPoint, current.point);
        colors.push(previousColor, current.color);
      }
      previousPoint = current.point;
      previousColor = current.color;
    }

    const draw = () => {
      tc.clear();

      const modelMatrix = mat4
        .rotateY(rotation)
        .multiply(mat4.rotateX(rotation));
      const mvp = projectionMatrix.multiply(viewMatrix.multiply(modelMatrix));

      tc.drawLines(
        { point: points, color: colors },
        (inputs) => {
          return {
            position: mvp.multiplyVec4(inputs.point as vec4),
            outputs: {
              color: inputs.color,
            },
          };
        },
        (inputs) => inputs.color as vec4,
      );

      // flush the buffer to the canvas
      tc.flush();

      rotation = (rotation + 0.5) % 360;
    };

    const interval = setInterval(draw, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};
