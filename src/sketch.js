class Lamp {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.currFill = 0;
    this.targetFill = this.currFill;
  }

  draw() {
    if (this.targetFill > this.currFill) {
      let diff = this.targetFill - this.currFill;
      this.currFill = constrain(this.currFill + (diff * 0.40),
        this.currFill, this.targetFill);
    }

    if (this.currFill > this.targetFill) {
      let diff = this.currFill - this.targetFill;
      this.currFill = constrain(this.currFill - (diff * 0.10),
        this.targetFill, this.currFill);
    }

    for (let r = 2.5; r > 0.8; r -= 0.2)
    {
      fill(250, 10 * r * 2, this.currFill);
      circle(this.x, this.y, this.r * r);
    }
  }

  on() {
    this.targetFill = 100;
  }

  off() {
    this.targetFill = 0;
  }
}

class Quad {
  constructor(x, y, r, s) {
    this.lamps = [];

    this.lamps.push(new Lamp(x + (1 * r),     y + (1 * r),     r));
    this.lamps.push(new Lamp(x + (3 * r) + s, y + (1 * r),     r));
    this.lamps.push(new Lamp(x + (1 * r),     y + (3 * r) + s, r));
    this.lamps.push(new Lamp(x + (3 * r) + s, y + (3 * r) + s, r));
  }

  draw() {
    switch((frameCount >> 4) & 0b11)
    {
      case 0b00:
        this.lamps[0].on();
        this.lamps[1].on();
        this.lamps[2].off();
        this.lamps[3].off();
        break;
      case 0b01:
        this.lamps[0].on();
        this.lamps[1].off();
        this.lamps[2].off();
        this.lamps[3].on();
        break;
      case 0b10:
        this.lamps[0].off();
        this.lamps[1].off();
        this.lamps[2].on();
        this.lamps[3].on();
        break;
      case 0b11:
        this.lamps[0].off();
        this.lamps[1].on();
        this.lamps[2].on();
        this.lamps[3].off();
        break;
    }
    
    for (let l of this.lamps) {
      l.draw();
    }
  }
}

var quads = [];

function setup() {
  angleMode(DEGREES);
  createCanvas(850, 850);
  noStroke();
  colorMode(HSB);
  frameRate(60);

  let r = 20;
  let s = 30;
  let g = (r * 4) + s;
  
  let skip = false;
  
  for (let y = 0; y < height ; y += g * 1.5)
  {
    for (let x = 0; x < width; x += g * 1.5)
    {
      if (skip == false)
      {
        quads.push(new Quad(x + s, y + s, r, s));
        skip = true;
      }
      else
        skip = false;
    }
    
    if (skip == true)
      skip = false;
    else
      skip = true;
  }
}

function draw() {
  background(0);

  for (let q of quads) {
    q.draw();
  }
}