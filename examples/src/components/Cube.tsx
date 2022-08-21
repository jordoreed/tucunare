import { useEffect, useRef } from 'react';
import { Tucunare, mat4, vec4, FragmentShader, VertexShader } from 'tucunare';
import { MAX_CANVAS_SIZE } from '../constants';

export const Cube = () => {
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
    // uncomment if you want to draw both sides of triangles
    // tc.backFaceCullingEnabled = false;

    let projectionMatrix: mat4;
    const camera = new vec4(0, 0, 5, 1);
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

    const halfSize = 1;
    const left = -halfSize;
    const right = halfSize;
    const bottom = -halfSize;
    const top = halfSize;
    const near = halfSize;
    const far = -halfSize;
    const lbn = {
      point: new vec4(left, bottom, near, 1),
      color: new vec4(1, 0, 0, 1),
    };
    const rbn = {
      point: new vec4(right, bottom, near, 1),
      color: new vec4(0, 1, 0, 1),
    };
    const ltn = {
      point: new vec4(left, top, near, 1),
      color: new vec4(0, 0, 1, 1),
    };
    const rtn = {
      point: new vec4(right, top, near, 1),
      color: new vec4(1, 1, 1, 1),
    };
    const lbf = {
      point: new vec4(left, bottom, far, 1),
      color: new vec4(0, 0, 0, 1),
    };
    const rbf = {
      point: new vec4(right, bottom, far, 1),
      color: new vec4(1, 1, 0, 1),
    };
    const ltf = {
      point: new vec4(left, top, far, 1),
      color: new vec4(0, 1, 1, 1),
    };
    const rtf = {
      point: new vec4(right, top, far, 1),
      color: new vec4(1, 0, 1, 1),
    };
    const data = [
      // near
      lbn,
      rbn,
      rtn,
      lbn,
      rtn,
      ltn,
      // far
      rbf,
      lbf,
      ltf,
      rbf,
      ltf,
      rtf,
      // left
      lbf,
      lbn,
      ltn,
      lbf,
      ltn,
      ltf,
      // right
      rbn,
      rbf,
      rtf,
      rbn,
      rtf,
      rtn,
      // bottom
      lbf,
      rbf,
      rbn,
      lbf,
      rbn,
      lbn,
      // top
      ltn,
      rtn,
      rtf,
      ltn,
      rtf,
      ltf,
    ];
    const points = data.map((item) => item.point);
    const colors = data.map((item) => item.color);

    const draw = () => {
      tc.clear();

      const modelMatrix = mat4
        .rotateY(rotation)
        .multiply(mat4.rotateX(rotation));
      const mvp = projectionMatrix.multiply(viewMatrix.multiply(modelMatrix));

      const vertShader: VertexShader = (input) => {
        return {
          position: mvp.multiplyVec4(input.point as vec4),
          outputs: {
            color: input.color,
          },
        };
      };

      const fragShader: FragmentShader = (input) => input.color as vec4;

      tc.drawTriangles(
        { point: points, color: colors },
        vertShader,
        fragShader,
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
