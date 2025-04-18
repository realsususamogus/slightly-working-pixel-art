let slider;
let cols;
let rows;
let colourinfo = []; //an empty array
let gap; //squarish cells
let colourpicker;
let current_bg;
let bgpicker;
let gridtoggle;
let shape;
let isDrawing = false;
let startPixelX;
let startPixelY;
let endPixelX;
let endPixelY;
let actuallyclear;
let cleared = false;
let fillpicker;
let stroketoggle;
let storke;
function setup() {
  cols = 50;
  rows = 50;
  createCanvas(500, 500);
  gridtoggle = createCheckbox("Grid Toggle");
  gridtoggle.changed(griddies);
  gridtoggle.addClass("checkbox")
  shape = createCheckbox("Shape tool");
  shape.changed(draw_shape);
  shape.addClass("checkbox")
  stroketoggle = createCheckbox("Stroke toggle");
  stroketoggle.changed(strokey);
  stroketoggle.addClass("checkbox")
  actuallyclear = createButton("Clear");
  actuallyclear.position(width/2 - 120, height+15)
  actuallyclear.addClass("button")
  colourpicker = createColorPicker("black");
  colourpicker.position(width / 2 - 30, height + 30)
  bgpicker = createColorPicker("white");
  current_bg = bgpicker.color();
  bgpicker.position(width / 2 + 60, height + 30);
  fillpicker = createColorPicker("orange");
  fillpicker.position(width / 2 + 150, height + 30);
  
  

  for (let i = 0; i < cols * rows; i = i + 1) {
    colourinfo.push(bgpicker.color());
  }
}
function mousePressed() {
  isDrawing = true;
  gap = width / cols;
  startPixelX = floor(mouseX / gap);
  startPixelY = floor(mouseY / gap);
}
function mouseDragged() {
  if (isDrawing) {
    gap = width / cols;
    endPixelX = floor(mouseX / gap);
    endPixelY = floor(mouseY / gap);
    draw_shape(startPixelX, startPixelY, endPixelX, endPixelY);
  }
}
function mouseReleased() {
  isDrawing = false;
}
function draw_shape() {
  gap = width / cols;
  let pos = 0;
}

function same_color(color1, color2) {
  return (
    color1._getRed() == color2._getRed() &&
    color1._getGreen() == color2._getGreen() &&
    color1._getBlue() == color2._getBlue()
  );
}

function draw() {
  actuallyclear.mousePressed(realclear);
  rect(0, height + 5, width, height + 5)

  frameRate(60);
  gap = width / cols;

  if (mouseIsPressed && mouseX < width && mouseY < height && !shape.checked()) {
    whichcol = floor(mouseX / gap);
    whichrow = floor(mouseY / gap);
    colourinfo[whichcol + whichrow * cols] = colourpicker.color();
  }

  //update background
  if (!same_color(current_bg, bgpicker.color())) {
    for (let i = 0; i < cols * rows; i = i + 1) {
      if (same_color(colourinfo[i], current_bg))
        colourinfo[i] = bgpicker.color();
    }
    current_bg = bgpicker.color();
  }

  let pos = 0;
  for (let y = 0; y < height; y = y + gap) {
    for (let x = 0; x < width; x = x + gap) {
      fill(colourinfo[pos]);
      square(x, y, gap);
      pos = pos + 1; //move to next suqrae
    }
  }
  if (shape.checked() && isDrawing) {
    fill(fillpicker.color()); // Outline the rectangle without filling it
    stroke("black");
    let x1 = startPixelX * gap;
    let y1 = startPixelY * gap;
    let x2 = endPixelX * gap;
    let y2 = endPixelY * gap;
    rect(x1, y1, x2 - x1, y2 - y1);
    stroke("black");
    griddies();
    if (startPixelX < endPixelY && startPixelY< endPixelY) {
      for (let i = startPixelX; i < endPixelX; i++) {
        for (let j = startPixelY; j < endPixelY; j++) {
          colourinfo[j * cols + i] = fillpicker.color();
        }
      }
    } else {
      for (let i = startPixelX; i > endPixelX; i--) {
        for (let j = startPixelY; j > endPixelY; j--) {
          colourinfo[j * cols + i] = fillpicker.color();
        }
      }
    }
    
  }
}
function griddies() {
  if (gridtoggle.checked()) {
    noStroke();
    noFill();
  } else {
    stroke("black");
  }
}
function realclear() {
  console.log("clearing");
  cleared = true;
  if (cleared == true) {
    for (let i = 0; i < cols * rows; i = i + 1) {
      colourinfo[i] = current_bg;
    }
  }
}
function strokey() {
  if (stroketoggle.checked()) {
    storke = colourpicker.color()
  }
}
