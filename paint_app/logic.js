
// random color generator
function random_color(){
  let r = Math.floor(Math.random() * 254);
  let g = Math.floor(Math.random() * 254);
  let b = Math.floor(Math.random() * 254);
  return `rgb(${r}, ${g}, ${b})`
}

//  the rectangle class that is used to render the rectangle on the canvas

function my_rectangle(startx,starty,endx,endy){
  this.startx = startx;
  this.starty = starty;
  this.endx = endx;
  this.endy = endy;
  this.color = random_color();
}

my_rectangle.prototype = {
  render: function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.startx,this.starty,this.endx,this.endy);
    ctx.fillRect(this.startx,this.starty,this.endx,this.endy);
    ctx.stroke();
  }
}




// array that holds all the rectangles drawn
let rect_array = [];


let my_canvas = document.getElementById("my_canvas");
let my_context = my_canvas.getContext("2d");


// tests if its just a mouse move or a user trying to draw
let drawing = false

let current_rect = new my_rectangle(0,0,0,0)


function renderlist(){


  my_context.clearRect(0, 0, my_canvas.width, my_canvas.height);
  for(let i=0; i<rect_array.length; i++){
    rect_array[i].render(my_context);
  }
}



// event listeners for user actions

my_canvas.addEventListener('click',printer)
my_canvas.addEventListener('mousedown',downer)

my_canvas.addEventListener('mouseup',upper)
my_canvas.addEventListener('mousemove',mover)
my_canvas.addEventListener('mouseout',upper)




// functions attached with the even listeners

function printer(e){
  // console.log(e);
  // console.log("hello");
}


function downer(e){
  // console.log("down", e);
  drawing = true;
  current_rect = new my_rectangle(e.x,e.y,e.x,e.y);
}

function upper(e){
  // console.log("up", e);
  drawing = false;
  rect_array.push(current_rect);

}

function mover(e){
  // console.log("move", e);
  if (drawing === true){
    current_rect.endx = e.x - current_rect.startx;
    current_rect.endy = e.y - current_rect.starty;
    renderlist();
    current_rect.render(my_context);
  }

}



// my_context.moveTo(0,0);
// my_context.lineTo(50,50);
// my_context.stroke();
//
// my_context.beginPath();
// my_context.rect(50,50,20,100);
// my_context.stroke();

// console.log(my_context);
