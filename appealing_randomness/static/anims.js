function rotate_anim(x,y,i){
  this.pos = createVector(x,y);
  this.ang = i;
  this.size = 5;
  this.rad = 100;
  this.lifetime = 200;
}

rotate_anim.prototype.update = function(){
  this.ang += 0.2;
  this.lifetime--;
}

rotate_anim.prototype.show = function(){
  circle(this.pos.x + cos(this.ang) * this.rad, this.pos.x + cos(this.ang) * this.rad, this.size);
}
