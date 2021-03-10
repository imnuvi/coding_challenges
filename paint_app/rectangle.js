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
