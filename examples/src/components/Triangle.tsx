import { useEffect, useRef } from 'react';
import { Tucunare, mat4, vec4, FragmentShader, VertexShader } from 'tucunare';
import { MAX_CANVAS_SIZE } from '../constants';

export const Triangle = () => {
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
    tc.backFaceCullingEnabled = false;

    let projectionMatrix: mat4;
    const camera = new vec4(0, 0, 3, 1);
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

    const points = [
      new vec4(-1, -1, 0, 1), // bottom left
      new vec4(1, -1, 0, 1), // bottom right
      new vec4(0, 1, 0, 1), // top middle
    ];
    const colors = [
      new vec4(1, 0, 0, 1), // red
      new vec4(0, 1, 0, 1), // green
      new vec4(0, 0, 1, 1), // blue
    ];

    const draw = () => {
      tc.clear();

      const modelMatrix = mat4.rotateY(rotation);
      const mvp = projectionMatrix.multiply(viewMatrix.multiply(modelMatrix));

      const vertShader: VertexShader = (inputs) => ({
        position: mvp.multiplyVec4(inputs.point as vec4),
        outputs: {
          color: inputs.color,
        },
      });

      const fragShader: FragmentShader = (inputs) => inputs.color as vec4;

      tc.drawTriangles(
        { point: points, color: colors },
        vertShader,
        fragShader,
      );

      // flush the buffer to the canvas
      tc.flush();

      rotation = (rotation + 1.5) % 360;
    };

    const interval = setInterval(draw, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};
