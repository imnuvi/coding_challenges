

let my_canvas = document.getElementById("my_canvas");
let my_context = my_canvas.getContext("2d");

my_context.moveTo(0,0);
my_context.lineTo(50,50);
my_context.stroke();

console.log(my_context);
