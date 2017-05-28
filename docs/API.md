# Table of Contents
* [Tucunare](#tucunare)
  * [drawPoints](#drawpointsvertshader-fragshader)
  * [drawLines](#drawlinesvertshader-fragshader)
  * [drawTriangles](#drawtrianglesvertshader-fragshader)
  * [resize](#resizewidth-height)
* [VertexShader](#vertexshader)
  * [main](#maininput)
  * [incoming](#incoming)
* [FragmentShader](#fragmentshader)
  * [main](#maininput)
* [mat4](#mat4)
* [vec4](#vec4)
* [vec3](#vec3)
* [vec2](#vec2)
* [MathUtils](#mathutils)

# Tucunare
### drawPoints(vertShader, fragShader)
* Parameters
  1. vertShader: a VertexShader instance representing a vertex shader
  2. fragShader: a FragmentShader instance representing a fragment shader

### drawLines(vertShader, fragShader)
* Parameters
  1. vertShader: a VertexShader instance representing a vertex shader
  2. fragShader: a FragmentShader instance representing a fragment shader

### drawTriangles(vertShader, fragShader)
* Parameters
  1. vertShader: a VertexShader instance representing a vertex shader
  2. fragShader: a FragmentShader instance representing a fragment shader

### resize(width, height)
* Parameters
  1. width (optional): new width of the canvas and internal buffers
  2. height (optional): new height of the canvas and internal buffers
If no paramerters are provided the current width and height of the canvas will be used instead

# VertexShader
### main(input)
The main method must be overriden and will be called for every item in the data sources defined in the instance's incoming object
* Parameters
  1. input: the current item(s) that the vertex shader is operating on
* Return - expects an object with two properties
  1. position: the transformed point
  2. output (optional): any data that needs to be interpolated and passed on to the fragment shader (e.g. color). values of type number, vec2, vec3, or vec4 are the only acceptable values.

### incoming
A member object of a VertexShader instance used to define incoming data sources. All incoming data sources are required to have the same length.
```javascript
vertShader.incoming.point = points;
```
The above line of code will result in a "point" property being passed to the main method inside the "input" parameter e.g.
```javascript
console.log(input.point);
```

# FragmentShader
### main(input)
The main method must be overriden and will be called for every pixel drawn
* Parameters
  1. input: the interpolated values coming from the vertex shader
* Return - expects an object of type vec4 (representing the pixel's color)

# mat4
# vec4
# vec3
# vec2
# MathUtils
