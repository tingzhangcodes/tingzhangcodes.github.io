// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

// https://stackoverflow.com/questions/3318565/any-way-to-clone-html5-canvas-element-with-its-content
function cloneCanvas(oldCanvas) {
  //create a new canvas
  var newCanvas = document.createElement('canvas');
  var context = newCanvas.getContext('2d');

  //set dimensions
  newCanvas.width = oldCanvas.width;
  newCanvas.height = oldCanvas.height;

  //apply the old canvas to the new one
  context.drawImage(oldCanvas, 0, 0);

  //return the new canvas
  return newCanvas;
}

function downloadShapes() {
  var canvasList = document.getElementsByTagName("canvas");
  var leftCanvas = canvasList[0];
  var leftCtx = leftCanvas.getContext("2d");
  var rightCanvas = canvasList[1];
  var rightCtx = rightCanvas.getContext("2d");
  var ctxList = [leftCtx, rightCtx];
  var tempCanvas = cloneCanvas(leftCanvas);
  var tempCtx = tempCanvas.getContext("2d")

  const step = 25;
  for (let pixel = 0; pixel < tempCanvas.width; pixel += step) {
    // i will toggle from 0 to 1 and back with each iteration
    var i = (pixel / step) % 2;
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
    var imageData = ctxList[i].getImageData(pixel, 0, step, tempCanvas.height);
    tempCtx.putImageData(imageData, pixel, 0);
  }

  var dataURL = tempCanvas.toDataURL("image/png");
  downloadURI(dataURL, 'dusen-n-dusen.png');
}
