let anim_array = [];

let power_lifetime = 80;
let explosion_lifetime = 30;
let lightning_lifetime = 5;
let humongous_lifetime = 60;
let collator_lifetime = 30;

let accent_col;
let bg_col;
let raddist;

let bright = true;

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
  else if(random_selection == 2){
    val = Math.floor(random(3,8));
    // val = 3;
    for(let i=0; i < val; i++){
      anim_array.push(new explosion_animation(x,y,i,1,val));
    }
  }
  else if(random_selection == 3){
    console.log(anim_array);
    for (let i=0; i<1; i++){
      anim_array.push(new humongous_animation(x,y,i));
    }
  }

  else if(random_selection == 4){
    // anim_array.push(new packer_animation(x,y));
    anim_array.push(new packer_animation(x,y,30));
  }
  else if(random_selection == 5){
    grav = ((random(-1,1)>0) ? 1 : -1 );
    for (let i = 0; i<3; i++){
      anim_array.push(new Bubble(x,y,0,1,((random(-1,1)>0) ? 1 : -1 )));
      anim_array.push(new Bubble(x,y,0,-1,((random(-1,1)>0) ? 1 : -1 )));
    }
  }
  else if(random_selection == 6){
    anim_array.push(new collator_animation(x,y));
  }

  else if(random_selection == 7){
    for (let i=0; i<3; i++){
      anim_array.push(new gravity_animation(x,y,i));
      // console.log(anim_array);
    }
  }
}

function keyPressed(){
  if (keyCode === 32){
    if (bright){
      set_color(50,50,50);
    }
    else{
      set_color(255,255,255)
    }
  }
}

function mouseReleased(){
  cur_rand = ((random() > 0.95) ? 1 : 0);
  // cur_rand = 1;

  if (cur_rand){
    anim_array.push(new thunder_animation());
  }
  add_anim(Math.floor(random(1,7)),mouseX,mouseY);
  // add_anim(6,mouseX,mouseY);    // tester
  console.log(anim_array);
}

// function mouseMoved(){
//   add_anim(6,mouseX,mouseY);
//   // add_anim(Math.floor(random(0,7)),mouseX,mouseY);
// }

function mouseDragged(){
  add_anim(Math.floor(random(7,8)),mouseX,mouseY);
}

// function mouseMoved(){
//   // console.log(Math.atan(radians((mouseX-ww/2)/(mouseY-wh/2))));
//   push();
//   // translate(ww/2,wh/2);
//   console.log(createVector(ww/2,wh/2).angleBetween(createVector(mouseX-ww/2,mouseY-wh/2)));
//   pop();
// }

function set_color(x,y,val){
  if (bright){
    bright = false;
  }
  else{
    bright = true;
  }
  bg_col = (255-x,255-y, 255-val)
  accent_col = color(x,y,val);
}

function init(){
  pixelDensity(2);
  noStroke();
  ww = windowWidth;
  wh = windowHeight;
  raddist = dist(ww/2,wh/2,0,0);
  canvas = createCanvas(ww,wh);
  canvas.style('z-index','-1');
  canvas.position(0,0);

  set_color(50,50,50);
}


function setup(){
  angleMode(DEGREES);
  init();
}

function draw(){

  background(bg_col);
  for (let i=0; i<anim_array.length; i++){
    // fill(random_color());
    anim = anim_array[i];
    if (anim.alive){
      push()
        anim.update();
        anim.show();
      pop();
    }
    else{
      anim_array.splice(i--,1);
    }
  }
  // circle(mouseX,mouseY,100);
}
