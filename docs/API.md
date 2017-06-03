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
* [vec4, vec3, vec2](#vec4-vec3-vec2)
* [vec4](#vec4)
* [vec3](#vec3)
* [vec2](#vec2)
* [MathUtils](#mathutils)

# Tucunare
### drawPoints(vertShader, fragShader)
* Parameters
  1. [VertexShader] vertShader
  2. [FragmentShader] fragShader

### drawLines(vertShader, fragShader)
* Parameters
  1. [VertexShader] vertShader
  2. [FragmentShader] fragShader

### drawTriangles(vertShader, fragShader)
Expects point data to appear in counter-clockwise order
* Parameters
  1. [VertexShader] vertShader
  2. [FragmentShader] fragShader

### resize(width, height)
If no paramerters are provided the current width and height of the canvas will be used instead
* Parameters
  1. [number] width  (optional): new width of the canvas and internal buffers
  2. [number] height (optional): new height of the canvas and internal buffers

### backFaceCullingEnabled
A boolean value used to determine if back-face culling should be performed or not. Defaults to true.

# VertexShader
### main(input)
The main method must be overriden and will be called for every item in the data sources defined in the instance's incoming object
* Parameters
  1. [object] input: the current item(s) that the vertex shader is operating on
* Return - expects an object with two properties
  1. [vec4] position: transformed point
  2. [objvect] output (optional): any data that needs to be interpolated and passed on to the fragment shader (e.g. color). values of type number, vec2, vec3, or vec4 are the only acceptable values.

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
  1. [object] input: interpolated values coming from the vertex shader
* Return - expects an object of type vec4 (representing the pixel's color)

# mat4
### mat4.identity()
Returns a new instance of the idenity matrix

### mat4.perspectiveAspectRatio(aspectRatio, fov, n, f)
Returns a new instance of a perspective matrix
* Parameters
  1. [number] aspectRatio: aspect ratio of the viewport
  2. [number] fov: field of view
  3. [number] n: near clipping boundary
  4. [number] f: far  clipping boundary

### mat4.perspective(l, r, b, t, n, f)
Returns a new instance of a perspective matrix
* Parameters
  1. [number] l: left   clipping boundary
  2. [number] r: right  clipping boundary
  3. [number] b: bottom clipping boundary
  4. [number] t: top    clipping boundary
  5. [number] n: near   clipping boundary
  6. [number] f: far    clipping boundary

### mat4.orthographicAspectRatio(aspectRatio, n, f)
Returns a new instance of an orthographic matrix
* Parameters
  1. [number] aspectRatio: aspect ratio of the viewport
  5. [number] n: near clipping boundary
  6. [number] f: far  clipping boundary

### mat4.orthographic(l, r, b, t, n, f)
Returns a new instance of an orthographic matrix
* Parameters
  1. [number] l: left   clipping boundary
  2. [number] r: right  clipping boundary
  3. [number] b: bottom clipping boundary
  4. [number] t: top    clipping boundary
  5. [number] n: near   clipping boundary
  6. [number] f: far    clipping boundary

### mat4.translate(x, y, z)
Returns a new instance of a translation matrix
* Parameters
  1. [number] x: x translation
  2. [number] y: y translation
  3. [number] z: z translation

### mat4.scale(x, y, z)
Returns a new instance of a scale matrix
* Parameters
  1. [number] x: x scale
  2. [number] y: y scale
  3. [number] z: z scale

### mat4.rotateX(degrees)
Returns a new instance of a rotation matrix about the x axis
* Parameters
  1. [number] degrees: number of degrees to rotate

### mat4.rotateY(degrees)
Returns a new instance of a rotation matrix about the y axis
* Parameters
  1. [number] degrees: number of degrees to rotate

### mat4.rotateZ(degrees)
Returns a new instance of a rotation matrix about the z axis
* Parameters
  1. [number] degrees: number of degrees to rotate

### mat4.lookAt(pos, focus, up)
Returns a new instance of a "look at" or "view" matrix
* Parameters
  1. [vec3] pos: camera's position in 3D space
  2. [vec3] focus: point the camera is looking at
  3. [vec3] up: direction of "up"

### duplicate()
Returns a duplicate of the matrix

### multiply(r)
Returns a new instance from the result of the multiplication
* Parameters
  1. [mat4] r: right-hand side of the matrix multiplication

### multiplyEquals(r)
Multiplies the matrix with another ("r") and stores the result in itself
* Parameters
  1. [mat4] r: right-hand side of the matrix multiplication

### multiplyV4(v) multiplyV3(v), multiplyV2(v)
Multiplies a matrix and a vector of type vec4, vec3, or vec2 respectively
* Parameters
  1. [vec4, vec3, or vec2 respectively] v: the vector portion of the multiplication

# vec4, vec3, vec2
### add            
### addN           
### subtract       
### subtractN      
### scale          
### scaleN         
### divide         
### divideN        
### addEquals      
### addEqualsN     
### subtractEquals 
### subtractEqualsN
### scaleEquals    
### scaleEqualsN   
### divideEquals   
### divideEqualsN  

# vec4

# vec3

# vec2

# MathUtils
