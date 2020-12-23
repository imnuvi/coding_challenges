let anims_list = [];
let accent_col;
function random_color(){
  thecol = color(random(0,255),random(0,255),random(0,255));
  return thecol;
}

function reportsize(){
	resizeCanvas(windowWidth,windowHeight);
}


// function reportsize(){
// 	resizeCanvas(windowWidth,windowHeight);
// 	init();
// }


window.addEventListener('resize', reportsize);

function mousePressed(){
  anims_list.push(new packer_animation(mouseX,mouseY));
}

function init(){
  ww = windowWidth;
  wh = windowHeight;
  canvas = createCanvas(ww,wh);
  canvas.style('z-index','-1');
  canvas.position(0,0);
  accent_col = color(255,255,255);
}

function setup(){
  noStroke();
  pixelDensity(2);
  init();
}

function draw(){
  background(0);
  // circle(mouseX,mouseY,100);
  for (let i=0; i<anims_list.length; i++){
    // fill(random_color());
    anim = anims_list[i];
    if (anim.alive){
      push()
        anim.update();
        anim.show();
      pop();
    }
    else{
      anims_list.splice(i--,1);
    }
  }
}



function packer_animation(x,y){
  this.alive = true;
  this.pos = createVector(x,y);
  this.rad = 200;
  this.alpha = 200;
  this.lifetime = 200;
  this.poppers = [];
}

packer_animation.prototype = {
  filler: function(){
    r = this.rad * random();
    thet = random() * 2 * PI;

    nx = this.pos.x + r * Math.cos(thet);
    ny = this.pos.y + r * Math.sin(thet);
    // nx = random(ww);
    // ny = random(wh);

    this.poppers.push(new filled_circle(nx,ny));
  },

  update: function(){

    this.filler();
    if (this.lifetime <= 0){
      this.alive = false;
    }
    this.lifetime --;
    this.alpha--;

  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    circle(this.pos.x,this.pos.y,this.rad);
    for (let i=0; i<this.poppers.length; i++){
      this.poppers[i].update();
      this.poppers[i].show();
    }
  }
}


function filled_circle(x,y){
  this.alive = true;
  this.pos = createVector(x,y);
  this.rad = 0;
}

filled_circle.prototype = {
  update: function(){
    this.rad++ ;
  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    circle(this.pos.x,this.pos.y,this.rad);
  }
}
