const ORANGE = "#fca503";
const BLUE = "#4287f5";
const GREEN = "#32a852";
const MAGENTA = "#ad3499";
const COLORS = [ORANGE, BLUE, GREEN, MAGENTA];


class ShapeStage {
  constructor(container, stageId) {
    this.stage = new Konva.Stage({
      container: container,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.stage.id(stageId)

    this.shapeLayer = new Konva.Layer();
    this.stage.add(this.shapeLayer);
    this.shapeLayer.zIndex(0);
    this.shapeLayer.id('shape-layer');

    this.iconLayer = new Konva.Layer();
    this.stage.add(this.iconLayer);
    this.iconLayer.zIndex(1);
    this.iconLayer.id('icon-layer');
    this.showInfoIcon()

    this.stage.on('dblclick dbltap', this.dropShape);
  }


  showInfoIcon() {
    // https://fontawesome.com/icons/info-circle?style=solid
    const iconFile = 'info-circle-solid.svg';
    this.showIcon(iconFile, toggleInfo, 'right-center')
  }


  showNextIcon() {
    // https://fontawesome.com/icons/arrow-alt-circle-right
    const iconFile = 'arrow-alt-circle-right-solid.svg';
    this.showIcon(iconFile, toggleInfo, 'right')
  }


  showIcon(iconFile, callback, location='right-center') {
    const path = 'https://tngzng.github.io/games/dusen-n-dusen/assets/';
    const dimension = 36;
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


function toggleInfo(event) {
  var layer = this.getStage().findOne('#info-layer');
  if (layer === undefined) {
    const desktopStyling = (window.innerWidth >= 768);
    layer = new Konva.Layer();
    this.getStage().add(layer);
    layer.id('info-layer');
    const infoText = [
      "Tap twice for new shape.",
      "Drag to move.",
      "Download to save.",
    ]
    var text = new Konva.Text({
      text: infoText.join('\n'),
      fontSize: 18,
      fontStyle: 'bold',
      fontFamily: 'Courier',
      fill: '#141414',
      align: 'center',
      verticalAlign: 'middle',
      horizontalAlign: 'middle',
      height: this.getStage().height(),
      width: this.getStage().width(),
    });
    layer.add(text);
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
