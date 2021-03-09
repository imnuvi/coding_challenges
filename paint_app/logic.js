

let rect_array = [new my_rectangle(50,50,100,100), new my_rectangle(200,200,100,100)];


let my_canvas = document.getElementById("my_canvas");
let my_context = my_canvas.getContext("2d");




for(let i=0; i<rect_array.length; i++){
  rect_array[i].render(my_context);
}




my_canvas.addEventListener('click',printer)
my_canvas.addEventListener('mousedown',downer)

my_canvas.addEventListener('mouseup',upper)


function printer(e){
  // console.log(e);
  // console.log("hello");
}


function downer(e){
  console.log("down", e);
}

function upper(e){
  console.log("up", e);
}






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








my_context.moveTo(0,0);
my_context.lineTo(50,50);
my_context.stroke();

my_context.beginPath();
my_context.rect(50,50,20,100);
my_context.stroke();

// console.log(my_context);
