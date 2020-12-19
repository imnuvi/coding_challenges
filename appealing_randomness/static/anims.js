
function power_animation(x,y,i,dir,rad){
  this.alive = true;
  this.pos = createVector(x,y);
  this.show_pos = this.pos.copy();
  this.id = map(i, 0, 5, 3, 1);;
  this.dir = dir;
  // this.val = random(0.4,1.4);
  this.ang = map(i, 0, 5, 0, 360);
  this.size = 2.5;
  this.rad = rad;
  this.lifetime = power_lifetime;
  this.alpha = random(60,150);
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


function explosion_animation(x,y){
  this.alive = true;
  this.pos = createVector(x,y);
  this.size = random(2,7);
  this.speed = createVector(random(3,10),random(3,10));
}

function
