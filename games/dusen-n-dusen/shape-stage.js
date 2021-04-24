const ORANGE = "#fca503";
const BLUE = "#4287f5";
const GREEN = "#32a852";
const MAGENTA = "#ad3499";
const COLORS = [ORANGE, BLUE, GREEN, MAGENTA];


class ShapeStage {
  constructor(container, width, height, displayIcons=false, callback=null) {
    this.stage = new Konva.Stage({
      container: container,
      width: width,
      height: height,
    });
    var shapeLayer = new Konva.Layer();
    this.stage.add(shapeLayer);
    shapeLayer.zIndex(0);

    if (displayIcons === true) {
      var iconLayer = new Konva.Layer();
      const iconFile = 'arrow-alt-circle-down-solid.svg';
      const path = 'https://tngzng.github.io/games/dusen-n-dusen/assets/';
      Konva.Image.fromURL(`${path}/${iconFile}`, (image) => {
        const dimension = 48;
        const padding = 12;
        image.setWidth(dimension);
        image.setHeight(dimension);
        image.setY(padding);
        image.setX(width - image.width() - padding);
        // add cursor styling
        image.on('mouseover', function () {
          document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', function () {
          document.body.style.cursor = 'default';
        });
        image.on('click tap', callback)
        iconLayer.add(image);
        this.stage.add(iconLayer);
        iconLayer.zIndex(1);
      })

    }
    this.stage.on('dblclick dbltap', this.dropShape);
  }

  dropShape(event) {
    const pointerPosition = this.getStage().getPointerPosition();
    const x = pointerPosition.x;
    const y = pointerPosition.y;
    var shape = makeShape(x, y);
    var layer = this.getStage().getLayers()[0]
    layer.add(shape);
    this.getStage().add(layer);
    layer.zIndex(0);
  }
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


function makeRandomBox(x, y) {
  return new Konva.Rect({
    x: x,
    y: y,
    width: getRandomInt(100, 300),
    height: getRandomInt(100, 300),
    fill: getRandomElement(COLORS),
    draggable: true,
  });
}


function makeRandomPolygon(x, y) {
  return new Konva.RegularPolygon({
    x: x,
    y: y,
    sides: 6,
    radius: getRandomInt(100, 200),
    fill: getRandomElement(COLORS),
    draggable: true,
  });
}


function makeRandomCircle(x, y) {
  return new Konva.Circle({
    x: x,
    y: y,
    radius: getRandomInt(100, 200),
    fill: getRandomElement(COLORS),
    draggable: true,
  });
}


function makeShape(x, y ) {
  var shapeFuncs = [makeRandomPolygon, makeRandomBox, makeRandomCircle];
  var shapeFunc = getRandomElement(shapeFuncs);
  var shape = shapeFunc(x, y)

  // add cursor styling
  shape.on('mouseover', function () {
    document.body.style.cursor = 'pointer';
  });
  shape.on('mouseout', function () {
    document.body.style.cursor = 'default';
  });

  return shape;
}
