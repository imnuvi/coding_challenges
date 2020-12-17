function rotate_anim(x,y,i){
  this.pos = createVector(x,y);
  // this.id = i;
  this.id = map(i, 0, 5, 3, 1);
  this.ang = i;
  this.size = 5;
  this.rad = 100;
  this.lifetime = 200;
}

// rotate_anim.prototype.update = function(){
//   this.ang += 0.025 * (this.id + 1);
//   this.lifetime--;
// }

rotate_anim.prototype.update = function(){
  // this.rad += 1;
  this.ang += 0.025*this.id;
  this.lifetime--;
}

rotate_anim.prototype.show = function(){
  circle(this.pos.x + cos(this.ang) * this.rad, this.pos.y + sin(this.ang) * this.rad, this.size);
}


function power_animation(x,y,i,dir){
  this.pos = createVector(x,y);
  this.show_pos = this.pos;
  this.id = i;
  this.dir = dir;
  this.ang = 0;
  this.size = 5;
  this.rad = 100;
  this.lifetime = 200;
}

power_animation.prototype = {
  update: function(){
    this.ang += 0.1;
    angleMode(DEGREES);
    this.show_pos.y = this.pos.y - map(sin(this.ang),-1,1,-10,10);
  },

  show: function(){
    circle(this.pos.x,this.pos.y,this.size);
  }
}
