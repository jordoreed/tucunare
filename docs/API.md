# Table of Contents
* [Tucunare](#tucunare)
  * [drawPoints](#drawpointsvertshader-fragshader)
  * [drawLines](#drawlinesvertshader-fragshader)
  * [drawTriangles](#drawtrianglesvertshader-fragshader)
  * [resize](#resizewidth-height)
  * [backFaceCullingEnabled](#backfacecullingenabled)
* [VertexShader](#vertexshader)
* [FragmentShader](#fragmentshader)
* [mat4](#mat4)
* [vec4, vec3, and vec2](#vec4vec3andvec2)
* [vec4](#vec4)
* [vec3](#vec3)
* [vec2](#vec2)
* [MathUtils](#mathutils)

# Tucunare
### drawPoints(vertShader, fragShader)
* Parameters
  1. vertShader: VertexShader instance
  2. fragShader: FragmentShader instance

### drawLines(vertShader, fragShader)
* Parameters
  1. vertShader: VertexShader instance
  2. fragShader: FragmentShader instance

### drawTriangles(vertShader, fragShader)
Expects point data to appear in counter-clockwise order
* Parameters
  1. vertShader: VertexShader instance
  2. fragShader: FragmentShader instance

### resize(width, height)
If no paramerters are provided the current width and height of the canvas will be used instead
* Parameters
  1. width  (optional): new width of the canvas and internal buffers
  2. height (optional): new height of the canvas and internal buffers

### backFaceCullingEnabled
A boolean value used to determine if back-face culling should be performed or not. Defaults to true.

# VertexShader
### main(input)
The main method must be overriden and will be called for every item in the data sources defined in the instance's incoming object
* Parameters
  1. input: the current item(s) that the vertex shader is operating on
* Return - expects an object with two properties
  1. position: transformed point
  2. output (optional): any data that needs to be interpolated and passed on to the fragment shader (e.g. color). values of type number, vec2, vec3, or vec4 are the only acceptable values.

### incoming
A member object of a VertexShader instance used to define incoming data sources. All incoming data sources are required to have the same length.
```javascript
vertShader.incoming.point = points;
```
The above line of code will result in a "point" property being passed to the main method inside the "input" parameter e.g.
```javascript
input.point
```

# FragmentShader
### main(input)
The main method must be overriden and will be called for every pixel drawn
* Parameters
  1. input: interpolated values coming from the vertex shader
* Return - expects an object of type vec4 (representing the pixel's color)

# mat4
### mat4.identity()
Returns a new instance of the idenity matrix

### mat4.perspectiveAspectRatio(aspectRatio, fov, n, f)
Returns a new instance of a perspective matrix
* Parameters
  1. aspectRatio: aspect ratio of the viewport
  2. fov: field of view
  3. n: near clipping boundary
  4. f: far  clipping boundary

### mat4.perspective(l, r, b, t, n, f)
Returns a new instance of a perspective matrix
* Parameters
  1. l: left   clipping boundary
  2. r: right  clipping boundary
  3. b: bottom clipping boundary
  4. t: top    clipping boundary
  5. n: near   clipping boundary
  6. f: far    clipping boundary

### mat4.orthographicAspectRatio(aspectRatio, n, f)
Returns a new instance of an orthographic matrix
* Parameters
  1. aspectRatio: aspect ratio of the viewport
  5. n: near clipping boundary
  6. f: far  clipping boundary

### mat4.orthographic(l, r, b, t, n, f)
Returns a new instance of an orthographic matrix
* Parameters
  1. l: left   clipping boundary
  2. r: right  clipping boundary
  3. b: bottom clipping boundary
  4. t: top    clipping boundary
  5. n: near   clipping boundary
  6. f: far    clipping boundary

### mat4.translate(x, y, z)
Returns a new instance of a translation matrix
* Parameters
  1. x: x translation
  2. y: y translation
  3. z: z translation

### mat4.scale(x, y, z)
Returns a new instance of a scale matrix
* Parameters
  1. x: x scale
  2. y: y scale
  3. z: z scale

### mat4.rotateX(degrees)
Returns a new instance of a rotation matrix about the x axis
* Parameters
  1. degrees: number of degrees to rotate

### mat4.rotateY(degrees)
Returns a new instance of a rotation matrix about the y axis
* Parameters
  1. degrees: number of degrees to rotate

### mat4.rotateZ(degrees)
Returns a new instance of a rotation matrix about the z axis
* Parameters
  1. degrees: number of degrees to rotate

# vec4, vec3, vec2

# vec4

# vec3

# vec2

# MathUtils
