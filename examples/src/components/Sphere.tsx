import { useEffect, useRef } from 'react';
import {
  Tucunare,
  mat4,
  vec2,
  vec4,
  vec3,
  VertexShader,
  FragmentShader,
} from 'tucunare';
import { MAX_CANVAS_SIZE } from '../constants';

const makeSphere = (rings: number, slices: number, radius: number) => {
  const points: vec4[] = [];
  const colors: vec4[] = [];
  const normals: vec3[] = [];
  const uvs: vec2[] = [];

  const color1 = new vec4(0, 0.5, 1, 1);
  const color2 = new vec4(1, 0, 0, 1);

  const vAngle = -180.0 / rings;
  const hAngle = 360.0 / slices;
  const vDirStart = new vec4(0, -radius, 0, 1);
  let lastRing: vec4[] = [];
  let lastRingUvs: vec2[] = [];
  for (let i = 0; i <= rings; i++) {
    const vd = mat4.rotateZ(vAngle * i).multiplyVec4(vDirStart);
    const ring: vec4[] = [];
    const ringUv = (vd.y + radius) / (radius * 2);
    const ringUvs: vec2[] = [];
    for (let j = 0; j <= slices; j++) {
      const hd = mat4.rotateY(hAngle * j).multiplyVec4(vd);
      ring.push(hd);

      const ringColUv = j / slices;
      ringUvs.push(new vec2(ringColUv, ringUv));

      if (ring.length > 1 && lastRing.length > 0) {
        const a = lastRing[j];
        const b = lastRing[j - 1];
        const c = ring[j - 1];
        const d = ring[j];
        const vs = [c, b, a, d, c, a];

        const ta = lastRingUvs[j];
        const tb = lastRingUvs[j - 1];
        const tc = ringUvs[j - 1];
        const td = ringUvs[j];
        const tcoords = [tc, tb, ta, td, tc, ta];
        for (let v = 0; v < vs.length; v++) {
          points.push(vs[v]);
          const normal = new vec3(vs[v].x, vs[v].y, vs[v].z).normalize();
          normals.push(normal);
          const t = (vs[v].y + radius) / (radius * 2);
          colors.push(color1.copy().lerp(color2, t));
          uvs.push(tcoords[v]);
        }
      }
    }
    lastRing = ring;
    lastRingUvs = ringUvs;
  }

  return {
    points: points,
    colors: colors,
    normals: normals,
    uvs: uvs,
  };
};

export const Sphere = () => {
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
    const camera = new vec4(0, 0, 3, 1);
    const viewMatrix = mat4.translate(-camera.x, -camera.y, -camera.z);
    let lightDirection = new vec3(1, 0, 0);
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
    // manually call the resized function to init the projection matrix
    windowResized();

    const sphere = makeSphere(16, 16, 1);

    const draw = () => {
      tc.clear();

      const modelMatrix = mat4
        .rotateY(rotation)
        .multiply(mat4.rotateX(rotation));
      const mvp = projectionMatrix.multiply(viewMatrix.multiply(modelMatrix));

      const vertShader: VertexShader = (inputs) => {
        const newNormal = mvp
          .multiplyUpperLeftVec3(inputs.normal as vec3)
          .normalize();
        return {
          position: mvp.multiplyVec4(inputs.point as vec4),
          outputs: {
            color: inputs.color,
            normal: newNormal,
          },
        };
      };

      const fragShader: FragmentShader = (inputs) => {
        const color = inputs.color as vec3;
        const normal = inputs.normal as vec3;
        normal.normalize();
        const lightStrength = Math.max(normal.dot(lightDirection), 0.1);
        return new vec4(
          color.x * lightStrength,
          color.y * lightStrength,
          color.z * lightStrength,
          1,
        );
      };

      lightDirection = mat4.rotateY(0.5).multiplyVec3(lightDirection);
      lightDirection.normalize();

      tc.drawTriangles(
        {
          point: sphere.points,
          normal: sphere.normals as unknown as vec4[],
          color: sphere.colors,
        },
        vertShader,
        fragShader,
      );

      tc.flush();

      rotation = (rotation + 0.5) % 360;
    };

    const interval = setInterval(draw, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};
