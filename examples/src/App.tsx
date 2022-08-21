import { Points } from './components/Points';
import { Lines } from './components/Lines';
import { Triangle } from './components/Triangle';
import { Cube } from './components/Cube';
import { Sphere } from './components/Sphere';

export const App = () => {
  return (
    <div className="app">
      <Points />
      <Lines />
      <Triangle />
      <Cube />
      <Sphere />
    </div>
  );
};
