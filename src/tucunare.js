function Tucunare(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
}

Tucunare.FRUSTUM_PLANES = [
  // { value: new vec4( 0, 0,-1, 0), normal: new vec4( 0, 0, 1, 1) },
  // { value: new vec4( 0, 0, 1, 0), normal: new vec4( 0, 0,-1, 1) },
  { value: new vec4( 0, 0, 0, 0), normal: new vec4( 0, 0, 1, 1) },
  { value: new vec4( 0, 0, 0, 0), normal: new vec4( 0, 0,-1, 1) },
  { value: new vec4( 0, 0, 0, 0), normal: new vec4( 0, 1, 0, 1) },
  { value: new vec4( 0, 0, 0, 0), normal: new vec4( 0,-1, 0, 1) },
  { value: new vec4( 0, 0, 0, 0), normal: new vec4( 1, 0, 0, 1) },
  { value: new vec4( 0, 0, 0, 0), normal: new vec4(-1, 0, 0, 1) }
];

Tucunare.pointInFrustumPlane = function(point, planeIndex) {
  var plane  = Tucunare.FRUSTUM_PLANES[planeIndex].value; //.scaleN(point.w);
  var normal = Tucunare.FRUSTUM_PLANES[planeIndex].normal;
  return point.subtract(plane).dot(normal) >= 0;
};

Tucunare.pointInFrustum = function(point) {
  // for (var i = 0; i < Tucunare.FRUSTUM_PLANES.length; i++) {
  //   if (!Tucunare.pointInFrustumPlane(point, i)) {
  //     return false;
  //   }
  // }
  // return true;

  var a = (
    point.x >= -point.w && point.x <= point.w &&
    point.y >= -point.w && point.y <= point.w &&
    point.z >= -point.w && point.z <= point.w &&
    point.w > 0
  );
  return a;
};

Tucunare.getIntersectionInPlane = function(clip1, clip2, color1, color2, planeIndex) {
  var plane  = Tucunare.FRUSTUM_PLANES[planeIndex].value; //.scaleN(clip1.w);
  var normal = Tucunare.FRUSTUM_PLANES[planeIndex].normal;
  var t = plane.subtract(clip1).dot(normal) / clip2.subtract(clip1).dot(normal);
  return {
    clip:  MathUtils.lerpVec4(clip1, clip2, t),
    color: MathUtils.lerpVec4(color1, color2, t)
  };
}

// Tucunare.findTwithW = function(w1, w2, t) {
//   var w = MathUtils.lerp(w1, w2, t);
//   return Math.abs((w - w1) / (w2 - w1));
// };

Tucunare.findTwithW = function(w1, w2, t) {
  var distance = MathUtils.lerp(1.0 / w1, 1.0 / w2, t);
  var p = 1.0 / distance;
  return Math.abs((p - w1) / (w2 - w1));
};

Tucunare.prototype.resize = function(width, height) {
  this.canvas.width = width;
  this.canvas.height = height;
  this.imageData = this.context.createImageData(width, height);
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
Tucunare.prototype.drawPoints = function(points, colors, mvp) {
  for (var i = 0; i < points.length; i++) {
    // model -> world -> view -> clip
    var clip = mvp.multiplyV4(points[i]);
    if (Tucunare.pointInFrustum(clip)) {
      var ndc    = this.clipToNdc(clip);
      var screen = this.ndcToScreen(ndc);
      var color = colors[i];
      this.setPixel(screen, color);
    }
  }
};

//
// LINES
//
Tucunare.prototype.drawLines = function(points, colors, mvp) {
  for (var i = 0; i < points.length; i += 2) {
    // model -> world -> view -> clip
    var clip1 = mvp.multiplyV4(points[i  ]);
    var clip2 = mvp.multiplyV4(points[i+1]);
    var clipped = this.clipLine(clip1, clip2, colors[i], colors[i+1]);
    if (clipped.length === 2) {
      var ndc1 = this.clipToNdc(clipped[0].clip);
      var ndc2 = this.clipToNdc(clipped[1].clip);
      var screen1 = this.ndcToScreen(ndc1);
      var screen2 = this.ndcToScreen(ndc2);
      this.drawScreenLine(screen1, screen2, clipped[0].color, clipped[1].color);
    }
  }
};

Tucunare.prototype.clipLine = function(clip1, clip2, color1, color2) {
  var isVisible = true;
  for (var i = 0; i < Tucunare.FRUSTUM_PLANES.length; i++) {
    var clipIsIn1 = Tucunare.pointInFrustumPlane(clip1, i);
    var clipIsIn2 = Tucunare.pointInFrustumPlane(clip2, i);
    var bothIn  =  clipIsIn1 &&  clipIsIn2;
    var bothOut = !clipIsIn1 && !clipIsIn2;

    if (bothOut) {
      isVisible = false;
      break;
    }
    else if (!bothIn) {
      var clipped = Tucunare.getIntersectionInPlane(clip1, clip2, color1, color2, i);
      if (clipIsIn1) {
        clip2  = clipped.clip;
        color2 = clipped.color;
      }
      else {
        clip1  = clipped.clip;
        color1 = clipped.color;
      }
    }
  }

  return isVisible ? [{clip: clip1, color: color1}, {clip: clip2, color: color2}] : [];
};

Tucunare.prototype.drawScreenLine = function(screen1, screen2, color1, color2, pixelArray) {
  var maxEdgeDistance = Math.max(Math.abs(screen1.x - screen2.x), Math.abs(screen1.y - screen2.y));
  if (maxEdgeDistance >= 0) {
    var increment = maxEdgeDistance > 0 ? (1.0 / maxEdgeDistance) : 0;
    var sameDepth = screen1.w.toPrecision(3) === screen2.w.toPrecision(3);
    for (var i = 0; i <= maxEdgeDistance; i++) {
      var pixelT = increment * i;
      var colorT = sameDepth ? pixelT : Tucunare.findTwithW(screen1.w, screen2.w, pixelT);

      var pixel = new vec4(
        Math.round(MathUtils.lerp(screen1.x, screen2.x, pixelT)),
        Math.round(MathUtils.lerp(screen1.y, screen2.y, pixelT)),
        0, MathUtils.lerp(screen1.w, screen2.w, colorT)
      );
      var color = MathUtils.lerpVec4(color1, color2, colorT);

      if (pixelArray) {
        pixelArray.push({screen: pixel, color: color});
      }
      this.setPixel(pixel, color);
    }
  }
};

//
// TRIANGLES
//
Tucunare.prototype.drawTriangles = function(points, colors, mvp) {
  for (var i = 0; i < points.length; i += 3) {
    // model -> world -> view -> clip
    var clip1 = mvp.multiplyV4(points[i  ]);
    var clip2 = mvp.multiplyV4(points[i+1]);
    var clip3 = mvp.multiplyV4(points[i+2]);

    if (this.triangleIsForwardFacing(clip1, clip2, clip3)) {
      var clipped = this.clipTriangle(clip1, clip2, clip3, colors[i], colors[i+1], colors[i+2]);
      for (var j = 0; j < clipped.length; j += 3) {
        var ndcUnsortedTriangle = [
          { ndc: this.clipToNdc(clipped[j  ].clip), color: clipped[j  ].color },
          { ndc: this.clipToNdc(clipped[j+1].clip), color: clipped[j+1].color },
          { ndc: this.clipToNdc(clipped[j+2].clip), color: clipped[j+2].color }
        ];
        var ndcSortedTriangle = ndcUnsortedTriangle.sort(function(a, b) {return a.ndc.y - b.ndc.y;});
        var bottom = ndcSortedTriangle[0];
        var middle = ndcSortedTriangle[1];
        var top    = ndcSortedTriangle[2];
        this.drawTriangle(
          this.ndcToScreen(bottom.ndc),
          this.ndcToScreen(middle.ndc),
          this.ndcToScreen(top.ndc),
          bottom.color, middle.color, top.color
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
  // return normalV3.dot(new vec3(clip1.x, clip1.y, clip1.z)) >= 0;

  // var a = clip2.subtract(clip1);
  // var b = clip3.subtract(clip1);
  // var aV3 = new vec3(a.x, a.y, a.z);
  // var bV3 = new vec3(b.x, b.y, b.z);
  // var normalV3 = aV3.cross(bV3);
  // return normalV3.dot(new vec3(clip1.x, clip1.y, clip1.z)) >= 0;
  // var normalV4 = new vec4(normalV3.x, normalV3.y, normalV3.z, 1); // clip1.w);
  // return clip1.dot(normalV4) >= 0;
};

// using this algorithm: https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm
Tucunare.prototype.clipTriangle = function(clip1, clip2, clip3, color1, color2, color3) {
  var outputList = [
    {clip: clip1, color: color1},
    {clip: clip2, color: color2},
    {clip: clip3, color: color3}
  ];

  for (var planeIndex = 0; planeIndex < Tucunare.FRUSTUM_PLANES.length; planeIndex++) {
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
            current.clip, previous.clip, current.color, previous.color, planeIndex));
        }
        outputList.push(current);
      }
      else if (previousIsInPlane) {
        outputList.push(Tucunare.getIntersectionInPlane(
          current.clip, previous.clip, current.color, previous.color, planeIndex));
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

Tucunare.prototype.drawTriangle = function(bottom, middle, top, bottomColor, middleColor, topColor) {
  var bt = [], bm = [], mt = [];
  this.drawScreenLine(bottom, top,    bottomColor, topColor,    bt);
  this.drawScreenLine(bottom, middle, bottomColor, middleColor, bm);
  this.drawScreenLine(middle, top,    middleColor, topColor,    mt);

  var sides = this.getTriangleSides(bt, bm, mt);
  for (var i = 0; i < sides.left.length; i++) {
    var left  = sides.left[i];
    var right = sides.right[i];
    this.setPixel(left.screen, left.color);
    this.setPixel(right.screen, right.color);
  }

  if (!keysDown[KEYS.SHIFT]) {
    for (var i = 0; i < sides.left.length; i++) {
      var left  = sides.left[i];
      var right = sides.right[i];
      this.drawScreenLine(left.screen, right.screen, left.color, right.color);
    }
  }
};

var aaa = 0;
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