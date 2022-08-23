import { Points } from './components/Points';
import { Lines } from './components/Lines';
import { Triangle } from './components/Triangle';
import { Cube } from './components/Cube';
import { Sphere } from './components/Sphere';

export const App = () => {
  return (
    <div className="app">
      <a href="https://github.com/jordoreed/tucunare/blob/master/examples/src/components/Points.tsx">
        <Points />
      </a>

      <a href="https://github.com/jordoreed/tucunare/blob/master/examples/src/components/Lines.tsx">
        <Lines />
      </a>

      <a href="https://github.com/jordoreed/tucunare/blob/master/examples/src/components/Triangle.tsx">
        <Triangle />
      </a>

      <a href="https://github.com/jordoreed/tucunare/blob/master/examples/src/components/Cube.tsx">
        <Cube />
      </a>

      <a href="https://github.com/jordoreed/tucunare/blob/master/examples/src/components/Sphere.tsx">
        <Sphere />
      </a>
    </div>
  );
};
