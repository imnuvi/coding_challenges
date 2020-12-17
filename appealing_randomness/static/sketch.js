let anim_array = [];


function random_color(){
  thecol = color(random(0,255),random(0,255),random(0,255));
  return thecol;
}

function add_anim(x,y){
  for (let i=0; i<5; i++){
    anim_array.push(new power_animation(x,y,i,1));
  }
}

function mouseClicked(){
  add_anim(mouseX,mouseY);
}

function init(){
  pixelDensity(2);
  noStroke();
  ww = windowWidth;
  wh = windowHeight;
  canvas = createCanvas(ww,wh);
  canvas.style('z-index','-1');
  canvas.position(0,0);
}

function setup(){
  init();
}

function draw(){

  background(0);
  for (anim of anim_array){
    // fill(random_color());
    anim.update();
    anim.show();
  }
  // circle(mouseX,mouseY,100);
}
