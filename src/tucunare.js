// MIT License
//
// Copyright (c) 2017 Jordan Reed
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

function Tucunare(canvas) {
  this.canvas = canvas;
  this.context = this.canvas.getContext("2d");
  this.backFaceCullingEnabled = true;

  this.resize();
}

Tucunare.FRUSTUM_PLANE_NORMALS = [
  new vec4( 0, 0, 1, 1),
  new vec4( 0, 0,-1, 1),
  new vec4( 0, 1, 0, 1),
  new vec4( 0,-1, 0, 1),
  new vec4( 1, 0, 0, 1),
  new vec4(-1, 0, 0, 1)
];

Tucunare.pointInFrustumPlane = function(point, planeIndex) {
  var normal = Tucunare.FRUSTUM_PLANE_NORMALS[planeIndex];
  return point.dot(normal) >= 0;
};

Tucunare.pointInFrustum = function(point) {
  for (var i = 0; i < Tucunare.FRUSTUM_PLANE_NORMALS.length; i++) {
    if (!Tucunare.pointInFrustumPlane(point, i)) {
      return false;
    }
  }
  return true;
};

Tucunare.getIntersectionInPlane = function(clip1, clip2, varying1, varying2, planeIndex) {
  var normal = Tucunare.FRUSTUM_PLANE_NORMALS[planeIndex];
  var t = clip1.dot(normal) / clip1.subtract(clip2).dot(normal);
  return {
    clip:    MathUtils.lerpVec4(clip1, clip2, t),
    varying: Tucunare.lerpVaryingValues(varying1, varying2, t)
  };
};

Tucunare.lerpVaryingValues = function(varying1, varying2, t) {
  var result = {};
  for (var propName in varying1) {
    if (varying1.hasOwnProperty(propName)) {
      var prop1 = varying1[propName];
      var prop2 = varying2[propName];
      if (typeof prop1 === "number") {
        result[propName] = MathUtils.lerp(prop1, prop2, t);
      }
      else if (prop1.constructor === vec2) {
        result[propName] = MathUtils.lerpVec2(prop1, prop2, t);
      }
      else if (prop1.constructor === vec3) {
        result[propName] = MathUtils.lerpVec3(prop1, prop2, t);
      }
      else if (prop1.constructor === vec4) {
        result[propName] = MathUtils.lerpVec4(prop1, prop2, t);
      }
    }
  }
  return result;
};

Tucunare.findTwithW = function(w1, w2, t) {
  var distance = MathUtils.lerp(1.0 / w1, 1.0 / w2, t);
  var p = 1.0 / distance;
  return Math.abs((p - w1) / (w2 - w1));
};

Tucunare.prototype.resize = function() {
  this.ndcToScreenIncrementX = (this.canvas.width  - 1) / 2.0;
  this.ndcToScreenIncrementY = (this.canvas.height - 1) / 2.0;
  this.clear();
};

Tucunare.prototype.setClearColor = function(color) {
  var str = "rgba(" + (color.x * 255) + "," + (color.y * 255) + "," + (color.z * 255) + "," + color.w + ")";
  this.canvas.style.backgroundColor = str;
};

Tucunare.prototype.clear = function() {
  this.imageData = this.context.createImageData(this.canvas.width, this.canvas.height);
  this.depthBuffer = [];
};

Tucunare.prototype.setPixel = function(screen, color) {
  if (screen.x < 0 || screen.x >= this.canvas.width || screen.y < 0 || screen.y >= this.canvas.height) {
    console.log("Can't draw point - out of bounds (" + screen.x + ", " + screen.y + ")");
    return;
  }

  var x = screen.x;
  var y = (this.canvas.height - 1) - screen.y;

  var offset = (Math.round(y) * this.canvas.width + Math.round(x)) * 4;
  var depth = this.depthBuffer[offset];
  if (depth === null || depth === undefined || depth > screen.w) {
    this.depthBuffer[offset] = screen.w;
    this.imageData.data[offset  ] = color.x * 255;
    this.imageData.data[offset+1] = color.y * 255;
    this.imageData.data[offset+2] = color.z * 255;
    this.imageData.data[offset+3] = color.w * 255;
  }
};

Tucunare.prototype.flush = function() {
  this.context.putImageData(this.imageData, 0, 0);
};

Tucunare.prototype.clipToNdc = function(point) {
  return new vec4(point.x / point.w, point.y / point.w, 0, point.w);
};

Tucunare.prototype.ndcToScreen = function(point) {
  return new vec4(
    Math.round((point.x + 1) * this.ndcToScreenIncrementX),
    Math.round((point.y + 1) * this.ndcToScreenIncrementY),
    0, point.w
  );
};

//
// POINTS
//
Tucunare.prototype.drawPoints = function(vertShader, fragShader) {
  var length = vertShader.findIncomingSourcesLength();
  for (var i = 0; i < length; i++) {
    var vsInput  = vertShader.getVertexShaderInput(i);
    var vsResult = vertShader.runVertexMain(vsInput);
    var clip = vsResult.position;

    if (Tucunare.pointInFrustum(clip)) {
      var ndc    = this.clipToNdc(clip);
      var screen = this.ndcToScreen(ndc);
      var color = fragShader.runFragmentMain(vsResult.output);
      this.setPixel(screen, color);
    }
  }
};

//
// LINES
//
Tucunare.prototype.drawLines = function(vertShader, fragShader) {
  var length = vertShader.findIncomingSourcesLength();
  for (var i = 0; i < length; i += 2) {
    var vsResult1 = vertShader.runVertexMain(vertShader.getVertexShaderInput(i  ));
    var vsResult2 = vertShader.runVertexMain(vertShader.getVertexShaderInput(i+1));
    var clip1 = vsResult1.position;
    var clip2 = vsResult2.position;

    var clipped = this.clipLine(clip1, clip2, vsResult1.output, vsResult2.output);
    if (clipped.length === 2) {
      var ndc1 = this.clipToNdc(clipped[0].clip);
      var ndc2 = this.clipToNdc(clipped[1].clip);
      var screen1 = this.ndcToScreen(ndc1);
      var screen2 = this.ndcToScreen(ndc2);
      this.drawScreenLine(screen1, screen2, clipped[0].varying, clipped[1].varying, fragShader);
    }
  }
};

Tucunare.prototype.clipLine = function(clip1, clip2, varying1, varying2) {
  var isVisible = true;
  for (var i = 0; i < Tucunare.FRUSTUM_PLANE_NORMALS.length; i++) {
    var clipIsIn1 = Tucunare.pointInFrustumPlane(clip1, i);
    var clipIsIn2 = Tucunare.pointInFrustumPlane(clip2, i);
    var bothIn  =  clipIsIn1 &&  clipIsIn2;
    var bothOut = !clipIsIn1 && !clipIsIn2;

    if (bothOut) {
      isVisible = false;
      break;
    }
    else if (!bothIn) {
      var clipped = Tucunare.getIntersectionInPlane(clip1, clip2, varying1, varying2, i);
      if (clipIsIn1) {
        clip2    = clipped.clip;
        varying2 = clipped.varying;
      }
      else {
        clip1    = clipped.clip;
        varying1 = clipped.varying;
      }
    }
  }

  return isVisible ? [{clip: clip1, varying: varying1}, {clip: clip2, varying: varying2}] : [];
};

Tucunare.prototype.drawScreenLine = function(screen1, screen2, varying1, varying2, fragShader, pixelArray) {
  var maxEdgeDistance = Math.max(Math.abs(screen1.x - screen2.x), Math.abs(screen1.y - screen2.y));
  if (maxEdgeDistance >= 0) {
    var increment = maxEdgeDistance > 0 ? (1.0 / maxEdgeDistance) : 0;
    var sameDepth = screen1.w.toPrecision(3) === screen2.w.toPrecision(3);
    for (var i = 0; i <= maxEdgeDistance; i++) {
      var pixelT   = increment * i;
      var varyingT = sameDepth ? pixelT : Tucunare.findTwithW(screen1.w, screen2.w, pixelT);

      var pixel = new vec4(
        Math.round(MathUtils.lerp(screen1.x, screen2.x, pixelT)),
        Math.round(MathUtils.lerp(screen1.y, screen2.y, pixelT)),
        0, MathUtils.lerp(screen1.w, screen2.w, varyingT)
      );
      var varying = Tucunare.lerpVaryingValues(varying1, varying2, varyingT);
      var color = fragShader.runFragmentMain(varying);

      if (pixelArray) {
        pixelArray.push({screen: pixel, varying: varying});
      }
      this.setPixel(pixel, color);
    }
  }
};

//
// TRIANGLES
//
Tucunare.prototype.drawTriangles = function(vertShader, fragShader) {
  var length = vertShader.findIncomingSourcesLength();
  for (var i = 0; i < length; i += 3) {
    var vsResult1 = vertShader.runVertexMain(vertShader.getVertexShaderInput(i  ));
    var vsResult2 = vertShader.runVertexMain(vertShader.getVertexShaderInput(i+1));
    var vsResult3 = vertShader.runVertexMain(vertShader.getVertexShaderInput(i+2));
    var clip1 = vsResult1.position;
    var clip2 = vsResult2.position;
    var clip3 = vsResult3.position;

    if (!this.backFaceCullingEnabled || this.triangleIsForwardFacing(clip1, clip2, clip3)) {
      var clipped = this.clipTriangle(clip1, clip2, clip3, vsResult1.output, vsResult2.output, vsResult3.output);
      for (var j = 0; j < clipped.length; j += 3) {
        var ndcUnsortedTriangle = [
          { ndc: this.clipToNdc(clipped[j  ].clip), varying: clipped[j  ].varying },
          { ndc: this.clipToNdc(clipped[j+1].clip), varying: clipped[j+1].varying },
          { ndc: this.clipToNdc(clipped[j+2].clip), varying: clipped[j+2].varying }
        ];
        var ndcSortedTriangle = ndcUnsortedTriangle.sort(function(a, b) {return a.ndc.y - b.ndc.y;});
        var bottom = ndcSortedTriangle[0];
        var middle = ndcSortedTriangle[1];
        var top    = ndcSortedTriangle[2];
        this.drawTriangle(
          this.ndcToScreen(bottom.ndc),
          this.ndcToScreen(middle.ndc),
          this.ndcToScreen(top.ndc),
          bottom.varying, middle.varying, top.varying,
          fragShader
        );
      }
    }
  }
};

Tucunare.prototype.triangleIsForwardFacing = function(clip1, clip2, clip3) {
  var ndc1 = this.clipToNdc(clip1);
  var ndc2 = this.clipToNdc(clip2);
  var ndc3 = this.clipToNdc(clip3);
  var a = ndc2.subtract(ndc1);
  var b = ndc3.subtract(ndc1);
  var aV3 = new vec3(a.x, a.y, a.z);
  var bV3 = new vec3(b.x, b.y, b.z);
  var normalV3 = aV3.cross(bV3);
  return normalV3.z >= 0;
};

// https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm
Tucunare.prototype.clipTriangle = function(clip1, clip2, clip3, varying1, varying2, varying3) {
  var outputList = [
    { clip: clip1, varying: varying1 },
    { clip: clip2, varying: varying2 },
    { clip: clip3, varying: varying3 }
  ];

  for (var planeIndex = 0; planeIndex < Tucunare.FRUSTUM_PLANE_NORMALS.length; planeIndex++) {
    if (outputList.length <= 0) {
      break;
    }

    var inputList = outputList;
    outputList = [];
    var previous = inputList[inputList.length-1];
    var previousIsInPlane = Tucunare.pointInFrustumPlane(previous.clip, planeIndex);

    for (var i = 0; i < inputList.length; i++) {
      var current = inputList[i];
      var currentIsInPlane = Tucunare.pointInFrustumPlane(current.clip, planeIndex);

      if (currentIsInPlane) {
        if (!previousIsInPlane) {
          outputList.push(Tucunare.getIntersectionInPlane(
            current.clip, previous.clip, current.varying, previous.varying, planeIndex));
        }
        outputList.push(current);
      }
      else if (previousIsInPlane) {
        outputList.push(Tucunare.getIntersectionInPlane(
          current.clip, previous.clip, current.varying, previous.varying, planeIndex));
      }

      previous = current;
      previousIsInPlane = currentIsInPlane;
    }
  }

  var numTriangles = outputList.length - 2;
  var clipped = [];
  for (var i = 0; i < numTriangles; i++) {
    clipped.push(outputList[0], outputList[i+1], outputList[i+2]);
  }
  return clipped;
};

Tucunare.prototype.drawTriangle = function(bottom, middle, top, bottomVarying, middleVarying, topVarying, fragShader) {
  var bt = [], bm = [], mt = [];
  this.drawScreenLine(bottom, top,    bottomVarying, topVarying,    fragShader, bt);
  this.drawScreenLine(bottom, middle, bottomVarying, middleVarying, fragShader, bm);
  this.drawScreenLine(middle, top,    middleVarying, topVarying,    fragShader, mt);

  var sides = this.getTriangleSides(bt, bm, mt);
  for (var i = 0; i < sides.left.length; i++) {
    var left  = sides.left[i];
    var right = sides.right[i];
    this.drawScreenLine(left.screen, right.screen, left.varying, right.varying, fragShader);
  }
};

Tucunare.prototype.getTriangleSides = function(bt, bm, mt) {
  var one = bm.concat(mt);
  var two = bt;
  var sides = {left: [], right: []};
  var bottomY = bt[0].screen.y;
  var topY = bt[bt.length-1].screen.y;
  function sortLeftToRight(a, b) { return a.screen.x - b.screen.x; }

  var index1 = 0, index2 = 0;
  for (var y = bottomY; y <= topY; y++) {
    var currentPixels = [];
    while (index1 < one.length && one[index1].screen.y === y) {
      currentPixels.push(one[index1++]);
    }
    while (index2 < two.length && two[index2].screen.y === y) {
      currentPixels.push(two[index2++]);
    }
    currentPixels.sort(sortLeftToRight);

    if (currentPixels.length >= 1) {
      sides.left.push(currentPixels[0]);
      sides.right.push(currentPixels[currentPixels.length-1]);
    }
  }

  return sides;
};
