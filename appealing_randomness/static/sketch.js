let anim_array = [];

let power_lifetime = 130;
let explosion_lifetime = 20;

let accent_col;


function random_color(){
  thecol = color(random(0,255),random(0,255),random(0,255));
  return thecol;
}

function add_anim(random_selection,x,y){
  if (random_selection == 1){
    rad = random(30,100);
    for (let i=0; i<3; i++){
      anim_array.push(new power_animation(x,y,i,1,rad));
      anim_array.push(new power_animation(x,y,i,0,rad));
    }
  }
  else if(random_selection = 2){
    val = Math.floor(random(3,8));
    // val = 3;
    for(let i=0; i < val; i++){
      anim_array.push(new explosion_animation(x,y,i,1,val));
  }
}
  console.log(anim_array);
}

function mouseClicked(){
  add_anim(Math.floor(random(1,3)),mouseX,mouseY);
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
  angleMode(DEGREES)
  init();
}

function draw(){

  background(0);
  for (let i=0; i<anim_array.length; i++){
    // fill(random_color());
    anim = anim_array[i];
    if (anim.alive){
      anim.update();
      anim.show();
    }
    else{
      anim_array.splice(i,1);
    }
  }
  // circle(mouseX,mouseY,100);
}
