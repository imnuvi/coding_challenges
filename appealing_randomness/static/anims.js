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
  this.rad += 1;
  this.size += 1;
  this.lifetime--;
}

rotate_anim.prototype.show = function(){
  circle(this.pos.x + cos(this.ang) * this.rad, this.pos.y + sin(this.ang) * this.rad, this.size);
}
