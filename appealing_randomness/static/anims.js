
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


function explosion_animation(x,y,count,level,val){
  this.alive = true;
  this.ang = (level<=1) ? map(count,0,val,0,360) : random(0,360);
  this.pos = createVector(x,y);
  this.size = (level<=1) ? random(3,5) : 2;
  // this.speed = createVector(random(-2,2),random(-2,2));
  this.speed = (level<=1) ? 4 : random(0,2);
  this.alpha = random(60,200);
  this.level = level;
  this.lifetime = explosion_lifetime;
}

explosion_animation.prototype = {
  update: function(){
    if (this.lifetime <= 0 && this.level > 1){
      this.alive = false;
    }
    else if (this.lifetime <= 0){
      this.alive = false;
      cnt = 10
      for(let i=0; i<=cnt; i++){
        anim_array.push(new explosion_animation(this.pos.x,this.pos.y,i,this.level+1,cnt));
      }
    }
    this.lifetime--;
    this.pos.add(createVector(cos(this.ang)*this.speed,sin(this.ang)*this.speed));
    this.alpha = map(this.lifetime,0,explosion_lifetime,40,200);
  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    circle(this.pos.x,this.pos.y,this.size);
  }
}

function gravity_animation(x,y,i){
  this.alive = true;
  this.id = i;
  this.pos = createVector(x,y);
  this.show_pos = this.pos.copy();
  this.ang = createVector(ww/2,wh/2).angleBetween(createVector(this.pos.x-ww/2,this.pos.y-wh/2)) + 360 + (20 * i);
  this.speed = 4;
  this.rad = dist(ww/2, wh/2, this.pos.x, this.pos.y);
  this.lifetime = this.speed * this.rad;
  // this.lifetime = 200;
  this.size = map(this.id,0,8,1,2);
  this.alpha = 200;
}

gravity_animation.prototype = {
  update: function(){
    if (this.rad <= 0){
      this.alive = false;
    }
    if (this.lifetime <= 0){
      this.alive = false;
    }
    this.lifetime--;
    this.rad -= 10;
    this.ang += 10;
    // this.pos.sub(createVector(this.speed*cos(this.ang),this.speed*sin(this.ang)));
    this.show_pos.y = map(sin(this.ang),-1,1,-this.rad,this.rad);
    this.show_pos.x = map(cos(this.ang),-1,1,-this.rad,this.rad);
  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    // circle(this.pos.x + this.show_pos.x ,this.pos.y + this.show_pos.y, this.size);
    circle(ww/2 + this.show_pos.x ,wh/2 + this.show_pos.y, this.size);
  }
}


function lightning_animation(x,y,i){
  this.alive = true;
  this.id = i;
  this.pos = createVector(x,y);
  this.size = 1;
  this.ang = random(0,360);
  this.rad = Math.max(dist(this.pos.x,this.pos.y,0,0),dist(this.pos.x,this.pos.y,ww,wh),dist(this.pos.x,this.pos.y,0,wh),dist(this.pos.x,this.pos.y,ww,0));
  this.point1 = createVector(sin(this.ang)*this.rad,cos(this.ang)*this.rad);
  this.point2 = createVector(sin(this.ang + 180)*this.rad,cos(this.ang + 180)*this.rad);
  this.lifetime = lightning_lifetime;
  this.alpha = 100;
}

lightning_animation.prototype = {
  update: function(){
    if (this.lifetime <= 0 ){
      this.alive = false;
    }
    this.lifetime--;
    // this.ang += 10;
    // this.point1 = createVector(sin(this.ang)*this.rad,cos(this.ang)*this.rad);
    // this.point2 = createVector(sin(this.ang + 180)*this.rad,cos(this.ang + 180)*this.rad);

    // this.size -= 2;
  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    stroke(accent_col);
    strokeWeight(this.size);
    line(this.pos.x + this.point1.x, this.pos.y + this.point1.y,this.pos.x + this.point2.x, this.pos.y + this.point2.y);
    noStroke();
  }
}

function humongous_animation(x,y,i){
  this.alive = true;
  this.id = i;
  this.pos = createVector(x,y);
  this.size = 1;
  this.ang = random(0,360);
  this.rad = Math.max(dist(this.pos.x,this.pos.y,0,0),dist(this.pos.x,this.pos.y,ww,wh),dist(this.pos.x,this.pos.y,0,wh),dist(this.pos.x,this.pos.y,ww,0));
  this.point1 = createVector(sin(this.ang)*this.rad,cos(this.ang)*this.rad);
  this.point2 = createVector(sin(this.ang + 180)*this.rad,cos(this.ang + 180)*this.rad);
  this.lifetime = humongous_lifetime;
  this.alpha = 10;
}

humongous_animation.prototype = {
  update: function(){
    if (this.lifetime <= 0 ){
      this.alive = false;
    }
    this.lifetime--;
    this.alpha = map(this.lifetime,0,humongous_lifetime,100,0);
    this.rad -= 20;
    // this.ang += 10;
    // this.point1 = createVector(sin(this.ang)*this.rad,cos(this.ang)*this.rad);
    // this.point2 = createVector(sin(this.ang + 180)*this.rad,cos(this.ang + 180)*this.rad);


  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    // circle(this.pos.x,this.pos.y,dist(this.point1.x,this.point1.y,this.pos.x,this.pos.y));
    // circle(this.pos.x,this.pos.y,dist(this.point1.x,this.point1.y,this.point2.x,this.point2.y));
    circle(this.pos.x,this.pos.y,this.rad);
  }
}
