const ORANGE = "#fca503";
const BLUE = "#4287f5";
const GREEN = "#32a852";
const MAGENTA = "#ad3499";
const COLORS = [ORANGE, BLUE, GREEN, MAGENTA];
const STAGE_1_ID = "stage-1";
const STAGE_2_ID = "stage-2";
const STAGE_3_ID = "stage-3";


class ShapeStage {
  constructor(stageId, visible=true, editable=true) {
    var container = document.getElementById("container");
    var stageDiv = document.createElement("div");
    stageDiv.id = stageId;
    if (visible !== true) {
      stageDiv.style.display = "none";
    }
    container.appendChild(stageDiv)

    this.stage = new Konva.Stage({
      container: stageId,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.stage.id(stageId)

    this.shapeLayer = new Konva.Layer();
    this.stage.add(this.shapeLayer);
    this.shapeLayer.id('shape-layer');
    this.shapeLayer.zIndex(0);

    this.iconLayer = new Konva.Layer();
    this.stage.add(this.iconLayer);
    this.iconLayer.id('icon-layer');
    this.iconLayer.zIndex(1);
    this.showInfoIcon()

    if (editable === true) {
      this.stage.on('dblclick dbltap', this.dropShape);
    }
  }

  showInfoIcon() {
    // https://fontawesome.com/icons
    const iconFile = 'info-circle-solid.svg';
    this.showIcon(iconFile, toggleInfo, 'right-center')
  }

  getShowStageCallback(stage) {
    switch (stage) {
      case STAGE_1_ID:
        return showStage1;
      case STAGE_2_ID:
        return showStage2;
      case STAGE_3_ID:
        return showStage3;
    }
  }

  showNextIcon(nextStage) {
    // https://fontawesome.com/icons
    const iconFile = 'arrow-right-solid.svg';
    var callback = this.getShowStageCallback(nextStage);
    this.showIcon(iconFile, callback, 'right')
  }

  showPrevIcon(prevStage) {
    // https://fontawesome.com/icons
    const iconFile = 'arrow-left-solid.svg';
    var callback = this.getShowStageCallback(prevStage);
    this.showIcon(iconFile, callback, 'left')
  }

  showDownloadIcon() {
    // https://fontawesome.com/icons
    const iconFile = 'arrow-down-solid.svg';
    this.showIcon(iconFile, downloadShapes, 'right')
  }

  showIcon(iconFile, callback, location='right-center') {
    const path = 'https://tngzng.github.io/games/dusen-n-dusen-2/assets/';
    const dimension = 48;
    const padding = 12;

    Konva.Image.fromURL(`${path}/${iconFile}`, (image) => {
      image.setWidth(dimension);
      image.setHeight(dimension);
      image.setY(padding);
      switch(location) {
        case 'right':
          var iconX = this.stage.width() - image.width() - padding;
          break
        case 'right-center':
          var iconX = this.stage.width() - image.width() * 2 - padding * 2;
          break
        case 'left':
          var iconX = padding
          break
      }
      image.setX(iconX);
      addCursorStyling(image);
      image.on('click tap', callback)
      this.iconLayer.add(image);
      this.stage.add(this.iconLayer);
      this.iconLayer.zIndex(1);
    })
  }

  dropShape(event) {
    var stage = this.getStage();
    const pointerPosition = stage.getPointerPosition();
    const x = pointerPosition.x;
    const y = pointerPosition.y;
    var shape = makeShape(x, y, stage.width());
    var layer = stage.findOne('#shape-layer');
    layer.add(shape);
    stage.add(layer);
    layer.zIndex(0);
  }
}


function showStage(stageId) {
  var stageSet = new Set([STAGE_1_ID, STAGE_2_ID, STAGE_3_ID]);
  stageSet.delete(stageId);

  var divToShow = document.getElementById(stageId);
  divToShow.style.display = "block";
  var stageToShow = Konva.stages.find(stage => stage.attrs.id == stageId);
  stageToShow.setListening(true);

  for (let hideId of stageSet) {
    var hideDiv = document.getElementById(hideId);
    hideDiv.style.display = "none";
    var stageToHide = Konva.stages.find(stage => stage.attrs.id == hideId);
    stageToHide.setListening(false);
  }
}


function showStage1(event) {
  showStage(STAGE_1_ID);
}


function showStage2(event) {
  showStage(STAGE_2_ID);
}


function showStage3(event) {
  showStage(STAGE_3_ID);
  spliceStages();
}


// https://stackoverflow.com/questions/6195729/most-efficient-way-to-prepend-a-value-to-an-array
function prepend(value, array) {
  var newArray = array.slice();
  newArray.unshift(value);
  return newArray;
}


function getInfoText(stagId) {
  const editingInfo =  [
    "Tap twice to make a shape.",
    "Drag shapes to move.",
    "Hit next when you're ready.",
  ];
  switch (stagId) {
    case STAGE_1_ID:
      return prepend("Make your first drawing:\n", editingInfo);
    case STAGE_2_ID:
      return prepend("Make your second drawing:\n", editingInfo);
    case STAGE_3_ID:
      return [
        "Your masterpiece is done!\n",
        "Hit download to save.",
      ];
  }
}


function toggleInfo(event) {
  var layer = this.getStage().findOne('#info-layer');

  if (layer === undefined) {
    const desktopStyling = (window.innerWidth >= 768);
    layer = new Konva.Layer();
    this.getStage().add(layer);
    layer.id('info-layer');

    var tooltip = new Konva.Label({
        opacity: 1,
        x: this.getStage().width() / 2,
        y: this.getStage().height() / 2,
      });
    tooltip.add(new Konva.Tag({fill: 'black'}));

    var infoText = getInfoText(this.getStage().id())
    var text = new Konva.Text({
      text: infoText.join('\n'),
      fontSize: 22,
      fontFamily: 'Courier',
      fill: 'white',
      align: 'center',
    });

    // horizontally and vertically center
    tooltip.offsetX(text.width() / 2)
    tooltip.offsetY(text.height() / 2)
    tooltip.add(text);
    layer.add(tooltip);
    this.getStage().add(layer)
    layer.zIndex(1);
  } else {
    layer.destroy(); // 💥
  }
}


function addCursorStyling(konvaElement) {
  konvaElement.on('mouseover', function () {
    document.body.style.cursor = 'pointer';
  });
  konvaElement.on('mouseout', function () {
    document.body.style.cursor = 'default';
  });
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}


function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}


function makeRandomBox(x, y, stageWidth) {
  return new Konva.Rect({
    x: x,
    y: y,
    width: getRandomInt(stageWidth / 8, stageWidth / 4),
    height: getRandomInt(stageWidth / 8, stageWidth / 4),
    fill: getRandomElement(COLORS),
    draggable: true,
  });
}


function makeRandomPolygon(x, y, stageWidth) {
  return new Konva.RegularPolygon({
    x: x,
    y: y,
    sides: 6,
    radius: getRandomInt(stageWidth / 8, stageWidth / 4),
    fill: getRandomElement(COLORS),
    draggable: true,
  });
}


function makeRandomCircle(x, y, stageWidth) {
  return new Konva.Circle({
    x: x,
    y: y,
    radius: getRandomInt(stageWidth / 8, stageWidth / 4),
    fill: getRandomElement(COLORS),
    draggable: true,
  });
}


function makeShape(x, y, stageWidth) {
  var shapeFuncs = [makeRandomPolygon, makeRandomBox, makeRandomCircle];
  var shapeFunc = getRandomElement(shapeFuncs);
  var shape = shapeFunc(x, y, stageWidth)
  addCursorStyling(shape);

  return shape;
}


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


function getStageCanvas(stageId) {
  var stageDiv = document.getElementById(stageId);
  var stageCanvas = stageDiv.getElementsByTagName('canvas')[0];
  var stageCtx = stageCanvas.getContext("2d");
  return [stageCanvas, stageCtx]
}


function spliceStages() {
  var [stage1Canvas, stage1Ctx] = getStageCanvas(STAGE_1_ID);
  var [stage2Canvas, stage2Ctx] = getStageCanvas(STAGE_2_ID);
  var ctxList = [stage1Ctx, stage2Ctx];

  var [stage3Canvas, stage3Ctx] = getStageCanvas(STAGE_3_ID);

  const step = 25;
  for (let pixel = 0; pixel < stage3Canvas.width; pixel += step) {
    // i will toggle from 0 to 1 and back with each iteration
    var i = (pixel / step) % 2;
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
    var imageData = ctxList[i].getImageData(pixel, 0, step, stage3Canvas.height);
    stage3Ctx.putImageData(imageData, pixel, 0);
  }
}


function downloadShapes() {
  var [stage3Canvas, stage3Ctx] = getStageCanvas(STAGE_3_ID);

  var dataURL = stage3Canvas.toDataURL("image/png");
  downloadURI(dataURL, 'dusen-n-dusen.png');
}
