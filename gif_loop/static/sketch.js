var fr_count = 120;
var angle = 0;
var counter;

function random_color(){
  thecol = color(random(0,255),random(0,255),random(0,255));
  return thecol;
}

function reportsize(){
	resizeCanvas(windowWidth,windowHeight);
  init();
}




window.addEventListener('resize', reportsize);


function init(){
  ww = windowWidth;
  wh = windowHeight;
  canvas = createCanvas(ww,wh);
  canvas.style('z-index','-1');
  canvas.position(0,0);
  background(0);

}

function setup(){
  init();
}

function draw(){
  background(0);
  let perc = (frameCount%fr_count)/fr_count;
  hei = map(sin(angle),-1,1,0,wh);
  circle(ww*perc,hei,100);
  // circle(mouseX,mouseY,100);
  counter ++;

  angle += 0.05;
}
