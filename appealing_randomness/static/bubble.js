function Bubble(start_x,start_y,depth,direction,grav){
  this.start = createVector(start_x,start_y);
  this.xpos = this.start.x;
  this.ypos = this.start.y;
  this.depth = depth;
  this.decval = wh/(this.ypos**(this.depth+1));

  this.std_velocity = (-1+Math.sqrt(1+(8*this.decval/this.gravity_value)))/2;
  this.max_limit = (wh)-(this.decval);
  this.size = 8/(2**depth);
  this.radius = this.size/2;
  this.y_velocity = random(0,-10) ;
  this.direction = direction;
  this.genesis = true;

  // this.gravity_value = ((random(-1,1)>0) ? 1 : -1 ) * (0.98 / 1.5);
  this.grav = grav;
  this.gravity_value = this.grav * (0.98 / 1.5);
  this.bubble_speed = random(0,6);
  this.alive = true;

  this.lifetime = random(10,60);
}

Bubble.prototype.show = function(){
  this.genesis = false;
  circle(this.xpos,this.ypos,this.size);
}

Bubble.prototype.collision = function(){
  // if (this.genesis == false && this.ypos <= this.max_limit && this.y_velocity != 0){
  //   this.y_velocity = gravity_value;
  // }
  if (this.depth > 3){
    this.alive = false;
  }
  if (this.lifetime <= 0){
    this.alive = false;
    anim_array.push(new Bubble(this.xpos,this.ypos,this.depth+1,1,this.grav));
    anim_array.push(new Bubble(this.xpos,this.ypos,this.depth+1,-1,this.grav));
  }
  if (((this.ypos + this.radius) >= wh) || (this.ypos - this.radius) <= 0) {

    this.y_velocity = -this.y_velocity-this.gravity_value;
    // this.y_velocity = -this.std_velocity * this.gravity_value;
  }
  if ((this.xpos + this.radius) >= ww  || (this.xpos - this.radius) <= 0){
    this.direction *= -1;
  }
  this.lifetime--;
}

Bubble.prototype.update = function(){
  this.collision();
  this.gravity();
  this.move();
}

Bubble.prototype.gravity = function(){
  this.y_velocity += this.gravity_value;
  this.ypos += this.y_velocity;

  // console.log(this.y_velocity);

}

Bubble.prototype.move = function(){
  this.xpos += this.bubble_speed*this.direction;
}
