


//  the rectangle class that is used to render the rectangle on the canvas

function my_rectangle(startx,starty,endx,endy){
  this.startx = startx;
  this.starty = starty;
  this.endx = endx;
  this.endy = endy;
}

my_rectangle.prototype = {
  render: function(ctx){
    ctx.beginPath();
    ctx.rect(this.startx,this.starty,this.endx,this.endy);
    ctx.stroke();
  }
}




// array that holds all the rectangles drawn
let rect_array = [new my_rectangle(50,50,100,100), new my_rectangle(200,200,100,100)];


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

}

function mover(e){
  // console.log("move", e);
  if (drawing === true){
    current_rect.endx = e.x - current_rect.startx;
    current_rect.endy = e.y - current_rect.starty;
    current_rect.render(my_context);
  }

}



my_context.moveTo(0,0);
my_context.lineTo(50,50);
my_context.stroke();

my_context.beginPath();
my_context.rect(50,50,20,100);
my_context.stroke();

// console.log(my_context);
