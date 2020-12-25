
function power_animation(x,y,i,dir,rad){
  this.alive = true;
  this.pos = createVector(x,y);
  this.show_pos = this.pos.copy();
  this.id = map(i, 0, 5, 3, 1);;
  this.dir = dir;
  // this.val = random(0.4,1.4);
  this.ang = map(i, 0, 5, 0, 360);
  this.size = 5;
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
  this.speed = (level<=1) ? 4 : val;
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
        anim_array.push(new explosion_animation(this.pos.x,this.pos.y,i,this.level+1,random(0,2)));
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
  this.pos = createVector(x*2.5,y*2.5);
  // this.pos = createVector(ww/2,wh/2);
  this.show_pos = this.pos.copy();
  this.ang = createVector(ww/2,wh/2).angleBetween(createVector(this.pos.x-ww/2,this.pos.y-wh/2)) + 360 + (20 * i);
  this.speed = 4;
  this.rad = dist(ww/2, wh/2, this.pos.x, this.pos.y);
  this.lifetime = this.speed * this.rad;
  // this.lifetime = 200;
  this.size = map(this.id,0,8,1,10);
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
  // this.rad = Math.max(dist(this.pos.x,this.pos.y,0,0),dist(this.pos.x,this.pos.y,ww,wh),dist(this.pos.x,this.pos.y,0,wh),dist(this.pos.x,this.pos.y,ww,0)) * 2;
  this.rad = dist(0,0,ww/2,wh/2);
  this.point1 = createVector(sin(this.ang)*this.rad,cos(this.ang)*this.rad);
  this.point2 = createVector(sin(this.ang + 180)*this.rad,cos(this.ang + 180)*this.rad);
  // this.lifetime = map(this.rad,dist(ww/2,wh/2,0,0),dist(0,0,ww,wh),30,humongous_lifetime);
  this.lifetime = humongous_lifetime;
  this.alpha = 10;
}

humongous_animation.prototype = {
  update: function(){
    if (this.lifetime <= 0 ){
      this.alive = false;
      for (let i=0; i< 10; i++){
        anim_array.push(new explosion_animation(this.pos.x,this.pos.y,0,2,4));
      }
    }
    this.lifetime--;
    this.alpha = map(this.lifetime,30,humongous_lifetime,30,0);
    this.rad -= 15;
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

// function packer_animation(x,y){
//   this.alive = true;
//   this.pos = createVector(x,y);
//   this.rad = 200;
//   this.alpha = 200;
//   this.lifetime = 200;
//   this.poppers = [];
// }
//
// packer_animation.prototype = {
//   filler: function(){
//     nx = random(ww);
//     ny = random(wh);
//
//     lst.push(new filled_circle(nx,ny));
//   },
//
//   update: function(){
//
//     if (this.lifetime <= 0){
//       this.alive = false;
//     }
//     this.lifetime --;
//     this.alpha--;
//
//   },
//
//   show: function(){
//     accent_col.setAlpha(this.alpha);
//     fill(accent_col);
//     circle(this.pos.x,this.pos.y,this.rad);
//   }
// }
//
//
// function filled_circle(x,y){
//   this.alive = true;
//   this.pos = createVector(x,y);
//   this.rad = 0;
// }
//
// filled_circle.prototype = {
//   update: function(){
//     this.rad++ ;
//   },
//
//   show: function(){
//     circle(this.pos.x,this.pos.y,this.rad);
//   }
// }

function packer_animation(x,y,cnt){
  this.alive = true;
  this.pos = createVector(x,y);
  this.rad = 200;
  this.alpha = 200;
  this.lifetime = 100;
  this.poppers = [];
  this.cnt = cnt;
}

packer_animation.prototype = {
  filler: function(){
    nx = random(ww);
    ny = random(wh);

    if (this.poppers.length > this.cnt){
      return;
    }
    this.poppers.push(new filled_circle(nx,ny));
  },

  update: function(){

    this.filler();
    if (this.lifetime <= 0){
      this.alive = false;
    }
    this.lifetime --;
    this.alpha--;

  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    // circle(this.pos.x,this.pos.y,this.rad);
    for (let i=0; i<this.poppers.length; i++){
      this.poppers[i].update();
      this.poppers[i].show();
    }
  }
}


function filled_circle(x,y){
  this.alive = true;
  this.pos = createVector(x,y);
  this.maxrad = random(22,100);
  this.rad = 0;
  this.alpha = 100;
}

filled_circle.prototype = {
  update: function(){
    if (this.rad >= this.maxrad){
      return;
    }
    this.rad++ ;
    this.alpha-=4;
  },

  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    circle(this.pos.x,this.pos.y,this.rad);
  }
}


function thunder_animation(){
  this.alive = true;
  this.lifetime = 20;
  // this.state  = ((random(-1,1) > 0) ? true : false);
  this.state = bright;
  this.bright = this.state;
  this.mult = 5;
}

thunder_animation.prototype = {
  update: function(){
    this.lifetime--;
    if (this.lifetime <= 0){
      this.alive = false;
      this.show();
    }
    if (this.lifetime%this.mult == 0){
      this.bright = (this.state);
    }
    else{
      this.bright = (!this.state);
    }

    if (this.lifetime%3 == 0){
      this.mult--;
    }
  },

  show: function(){
    if (this.bright){
      set_color(50,50,50);
    }
    else{
      set_color(255,255,255);
    }
  }
}


function collator_animation(x,y){
  this.alive = true;
  this.pos = createVector(x,y);

  this.lifetime = collator_lifetime;
  this.alpha = map(this.lifetime,0,collator_lifetime,0,100);
  this.children = this.fill();
}

collator_animation.prototype = {
  fill: function(){
    arr = [];
    val = random(0,90);
    for (let i = 0; i<=10; i++){
      ang = map(i,0,10,0,360) + val;
      // ang = 90;
      arr.push(new attracted(ww/2 + Math.cos(ang)*raddist, wh/2 + Math.sin(ang)*raddist, this));
      // arr.push(new attracted(ww/2,wh/2,this));
    }
    return arr;
  },
  update: function(){
    if (this.lifetime <= 0){
      this.alive = false;
    }
    for (let i=0; i<this.children.length; i++){
      this.children[i].update();
    }
    this.lifetime--;
    this.alpha--;
  },
  show: function(){
    accent_col.setAlpha(this.alpha);
    fill(accent_col);
    // circle(this.pos.x,this.pos.y,100);
    for (let i=0; i<this.children.length; i++){
      this.children[i].show();
    }
  }

}

function attracted(x,y,parent){
  this.alive = true;
  this.pos = createVector(x,y);
  this.parent = parent;
  this.lifetime = collator_lifetime;
  this.size = 20;

  this.amount = 0;
  this.curpos = this.pos.copy();
}

attracted.prototype = {
  update: function(){
    this.amount = map(this.lifetime,collator_lifetime,0,0,1);
    this.curpos = p5.Vector.lerp(this.pos,this.parent.pos,this.amount);
    this.lifetime --;
  },

  show: function(){
    circle(this.curpos.x,this.curpos.y,this.size);
  }
}
