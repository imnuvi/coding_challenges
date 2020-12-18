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


function rotor_animation(x,y,i,dir){
  this.alive = true;
  this.pos = createVector(x,y);
  this.show_pos = this.pos.copy();
  this.id = map(i, 0, 5, 3, 1);;
  this.dir = dir;
  this.ang = map(i, 0, 5, 0, 360);
  this.size = 5;
  this.rad = 100;
  this.lifetime = 200;
}

rotor_animation.prototype = {
  update: function(){
    // this.ang += 0.3*(5-this.id+1);
    this.ang += 3*(this.id);
    angleMode(DEGREES);
    this.show_pos.y = this.pos.y + map(sin(this.ang),-1,1,-this.rad/2,this.rad/2);
    this.show_pos.x = this.pos.x + map(cos(this.ang),-1,1,-this.rad/2,this.rad/2);
  },

  show: function(){
    circle(this.show_pos.x,this.show_pos.y,this.size);
  }
}

function power_animation(x,y,i,dir,rad){
  this.alive = true;
  this.pos = createVector(x,y);
  this.show_pos = this.pos.copy();
  this.id = map(i, 0, 5, 3, 1);;
  this.dir = dir;
  // this.val = random(0.4,1.4);
  this.ang = map(i, 0, 5, 0, 360);
  this.size = 2;
  this.rad = rad;
  this.lifetime = power_lifetime;
  this.alpha = random(60,100);
}

power_animation.prototype = {
  update: function(){

    if (this.lifetime <= 0){
      this.alive = false;
      return;
    }
    // this.ang += 0.3*(5-this.id+1);
    this.lifetime -= 1;
    this.alpha = map(this.lifetime,0,power_lifetime,40,200);
    // this.size = map(this.lifetime,0,power_lifetime,4,20);
    this.ang += 2*(this.id);
    angleMode(DEGREES);
    if (this.dir){
      this.show_pos.y = map(sin(this.ang),-1,1,-this.rad,this.rad); // this.pos.y;
      this.show_pos.x = map(cos(this.ang),-1,1,-this.rad/9,this.rad/9); // this.pos.x;
    }
    else{
      this.show_pos.y = map(sin(this.ang),-1,1,-this.rad/9,this.rad/9); // this.pos.y;
      this.show_pos.x = map(cos(this.ang),-1,1,-this.rad,this.rad); // this.pos.x;
    }
  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    push();
    translate(this.pos.x,this.pos.y);
    rotate(135);
    circle(this.show_pos.x,this.show_pos.y,this.size);
    pop();
    circle(this.show_pos.x + this.pos.x ,this.show_pos.y + this.pos.y ,this.size);

  }
}
