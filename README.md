# Tucunaré
A simple 3D graphics rendering pipeline for HTML5's Canvas.

## Heads Up
Tucunaré is a simple 3D rendering engine intended as an academic learning tool. If you want to render real-time 3D graphics, please use something like [WebGL](https://get.webgl.org/).

## Quickstart (Assumes basic understanding of 3D graphics pipelines)
Include the source files in your html
```html
<script type="text/javascript" src="src/vector.js"   ></script>
<script type="text/javascript" src="src/matrix.js"   ></script>
<script type="text/javascript" src="src/mathutils.js"></script>
<script type="text/javascript" src="src/shader.js"   ></script>
<script type="text/javascript" src="src/tucunare.js" ></script>
```
Create a new Tucunaré instance, and set the clear color.
```javascript
var canvas = // access your canvas object here
var tc = new Tucunare(canvas);
tc.setClearColor(new vec4(0, 0, 0, 1));
```
Create some geometry. In this example, a single triangle.
```javascript
// for triangles, points should appear in counter-clockwise order. otherwise they will be culled.
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
Create a vertex shader. The shader's "main" function will get called for every item in the data sources you provide. For each item in those data sources the main method will get called and passed an "input" object with "point" and "color" defined as properties. To pass data that doesn't change between points (like the MVP matrix), use the shader's "uniforms" object. We'll get to that in a minute.
Tucunaré expects the vertex shader to return an object with two properties:
* position (vec4): the transformed point in space
* output (object): an object containing all the values you wish to pass on to the fragment shader (can only contain values of type number, vec2, vec3, vec4)
```javascript
var vertShader = new Shader();
// tells the shader to look in the points array to find the "point" input and the colors array to find the "color" input
vertShader.incoming.point = points;
vertShader.incoming.color = colors;
// input will have two properties: input.point and input.color (as defined above)
vertShader.main = function(input) {
  return {
    position: this.uniforms.mvp.multiplyV4(input.point),
    output: {
      color: input.color
    }
  }
};
```
Create a fragment shader. We'll keep it simple for this example, but you can do any calculation you like in here to determine the fragment color. Tucunaré expects the fragment shader to return a single vec4 value:
* (vec4): the final color of the fragment (pixel)
```javascript
var fragShader = new Shader();
// input will have interpolated values based on the "output" from the vertex shader. in this case, "color"
fragShader.main = function(input) {
  return input.color;
};
```
Setup the project and view matrix. Then create the MVP matrix.
```javascript
var camera = new vec4(0, 0, 2, 1);
var viewMatrix = mat4.translate(-camera.x, -camera.y, -camera.z);
var projectionMatrix = mat4.perspectiveAspectRatio(canvas.width / canvas.height, 75, 0.1, 1000);
// include any model transformations in the multiplication here
var mvpMatrix = projectionMatrix.multiply(viewMatrix);

// give the mvp matrix to the vertex shader via the shader's "uniforms" object
vertShader.uniforms.mvp = mvpMatrix;
```
Draw the triangle and flush the buffer to the canvas
```javascript
// uncomment if you are animating and need to clear the screen between frames
// tc.clear()
tc.drawTriangles(vertShader, fragShader);
tc.flush();
```
## What does "tucunaré" mean?
Tucunaré is the Brazilian name for [Peacock Bass](https://en.wikipedia.org/wiki/Peacock_bass), a colorful fish in the Amazon region.
