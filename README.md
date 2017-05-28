# Tucunaré
A simple 3D graphics rendering pipeline for HTML5's Canvas.

## Heads Up
Tucunaré is a simple 3D rendering engine intended as an academic learning tool. If you want to render real-time 3D graphics, please use something like [WebGL](https://get.webgl.org/).

## Quickstart
Include the source files in your html
```html
<script type="text/javascript" src="keys.js"     ></script>
<script type="text/javascript" src="vector.js"   ></script>
<script type="text/javascript" src="matrix.js"   ></script>
<script type="text/javascript" src="mathutils.js"></script>
<script type="text/javascript" src="shader.js"   ></script>
<script type="text/javascript" src="tucunare.js" ></script>
```
Create a new Tucunaré instance
```javascript
var canvas = document.getElementById("tc-canvas");
var tc = new Tucunare(canvas);
```
Create some geometry. A single triangle, in this example.
```javascript
var points = [
  new vec4(-1,-1, 0, 1), // bottom left
  new vec4( 1,-1, 0, 1), // bottom right
  new vec4( 0, 1, 0, 1)  // top middle
];
var colors = [
  new vec4(1, 0, 0, 1), // red
  new vec4(0, 1, 0, 1), // green
  new vec4(0, 0, 1, 1)  // blue
];
```
Create a vertex shader. The shader's "main" function will get called for every item in the data sources you provide. For each item in those data sources the main method will get called and passed an "input" object with "point" and "color" defined as properties. Tucunaré expects the vertex shader to return an object with two properties
* position (vec4): the transformed point in space
* output (object): an object containing all the values you wish to pass on to the fragment shader
```javascript
var vertShader = new Shader();
// tells the shader to look in the points array to find the "point" input and the colors array to find the "color" input
vertShader.incoming.point = points;
vertShader.incoming.color = colors;
// the input parameter will have two properties: input.point and input.color (as defined above)
vertShader.main = function(input) {
  return {
    position: this.uniforms.mvp.multiplyV4(input.point),
    output: {
      color: input.color
    }
  }
};
```
Create a fragment shader.
```javascript
var fragShader = new Shader();
fragShader.main = function(input) {
  return input.color;
};
```

## What does "tucunaré" mean?
Tucunaré is the Brazilian name for [Peacock Bass](https://en.wikipedia.org/wiki/Peacock_bass), a very colorful fish in the Amazon region.
