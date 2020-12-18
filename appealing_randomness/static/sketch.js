let anim_array = [];

let power_lifetime = 100;

let accent_col;


function random_color(){
  thecol = color(random(0,255),random(0,255),random(0,255));
  return thecol;
}

function add_anim(x,y){
  rad = random(30,100);
  for (let i=0; i<3; i++){
    anim_array.push(new power_animation(x,y,i,1,rad));
    anim_array.push(new power_animation(x,y,i,0,rad));
  }
}

function mouseClicked(){
  add_anim(mouseX,mouseY);
}

function set_color(x,y){
  accent_col = color(x,y,255);
}
function init(){
  pixelDensity(2);
  noStroke();
  ww = windowWidth;
  wh = windowHeight;
  canvas = createCanvas(ww,wh);
  canvas.style('z-index','-1');
  canvas.position(0,0);

  set_color(255,255);
}

function setup(){
  init();
}

function draw(){

  background(0);
  for (anim of anim_array){
    // fill(random_color());
    if (anim.alive){
      anim.update();
      anim.show();
    }
    else{
      anim_pos = anim_array.indexOf(anim);
      anim_array.splice(anim,1);
    }
  }
  // circle(mouseX,mouseY,100);
}
