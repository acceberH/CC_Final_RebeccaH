let img_w=[];
let img_m=[];
var num=10;
var num2=8;
let eyess=[];
let balls=[];
let shapes=[];
var x=0, y=0;
let back;
let back2;
let back3;
let img;
let end_img;
let particles=[];
function preload() {
  for (let i=0; i<3; i++) {
    img_w[i]=loadImage("data/w"+i+".png");
    img_m[i]=loadImage("data/m"+i+".png");
  }
  back=loadImage("data/back.png");
  back2=loadImage("data/back2.png");
  back3=loadImage("data/back3.png");
  end_img=loadImage("data/img.png");
}
function setup() {

  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  tim=0;
  scaNum=2;
  x=(width/num);
  y=(height/num2);
  for (let i=0.5; i<num; i++) {
    for (let j=0.5; j<num2; j++) {
      eyess.push(new eye(i*x, j*y));
    }
  }
  for (let i=0; i<200; i++) {
    particles.push(new particle());
  }
}
var index=0;
var scaNum=2;
var tim=0;
let isEnd=0;
let alpha=255;
function draw() {
  if (isEnd==0) {
    tim++;
    background(0);
    if (tim>5&&tim<=20) {
      scaNum=4;
    } else if (tim>20&&tim<=60) {
      scaNum=8;
    } 
    let w=width/scaNum;
    let h=height/scaNum;
    if (scaNum!=8) {
      for (let i=0; i<w; i++) {
        for (let j=0; j<h; j++) {
          if ((i+j)%2==0) {
            image(img_w[index], w/2+i*w, h/2+j*h, w, h);
          } else {
            image(img_m[index], w/2+i*w, h/2+j*h, w, h);
          }
        }
      }
    }

    fill(255, 0, 0);
    textSize(22);
    text(index+" "+alpha, 30, 30);
    if (scaNum==8) {
      for (let i=0; i<back.width; i+=10) {
        for (let j=0; j<back.height; j+=10) {
          noStroke();
          if (index==0) {
            let r=red(color(back.get(i, j)));
            let g=green(color(back.get(i, j)));
            let b=blue(color(back.get(i, j)));
            fill(r, g, b, alpha);
          }
          if (index==1) {
            let r=red(color(back2.get(i, j)));
            let g=green(color(back2.get(i, j)));
            let b=blue(color(back2.get(i, j)));
            fill(r, g, b, alpha);
          }
          if (index==2) {
            let r=red(color(back3.get(i, j)));
            let g=green(color(back3.get(i, j)));
            let b=blue(color(back3.get(i, j)));
            fill(r, g, b, alpha);
          }
          rect(i, j, 10, 10);
        }
      }
      alpha-=30;
      if (alpha<0) {
        if (index<2) {
          index++;
          tim=0;
          scaNum=2;
          alpha=255;
        } else {
          isEnd=1;
        }
      }
    }
  }

  if (isEnd==1) {
    background(0);
    t++;
    for (let i=0; i<eyess.length; i++) {
      eyess[i].draw();
      eyess[i].move();
      balls.push(new ball(eyess[i].x+20, eyess[i].y));
    }
    for (let i=0; i<eyess.length; i++) {
      balls[i].draw();
    }


    if (t>400) {
      isEnd=2;
      background(0);
    }
  }
  if (isEnd==2) {
    for (let i=0; i<200; i++) {
      particles[i].draw();
    }
  }
}
//let isEnd2;
let t=0;
function mousePressed() {
  for (let i=0; i<eyess.length; i++) {
    eyess[i].flag=true;
    eyess[i].flag2=true;
  }
}
class ball {
  constructor(x, y) {
    this.yped=random(0.5, 1);
    this.x=x;
    this.y=y;
    this.alpha=255;
    this.aped=random(2, 4);
  }
  draw() {
    noStroke();
    fill(119, 193, 222, this.alpha);
    ellipse(this.x, this.y, 10, 17);
    this.y+=this.yped;
    this.alpha-=this.aped;
    if (this.alpha<0) {
      balls.splice(1, 1);
    }
  }
}
class particle {
  constructor() {
    this.x=width/2;
    this.y=height/2;
    this.xped=random(-3, 3);
    this.yped=random(-3, 3);
  }
  draw() {
    noStroke();
    let c=color(end_img.get(this.x, this.y));
    fill(c);
    ellipse(this.x, this.y, 10, 10);
    this.x+=this.xped;
    this.y+=this.yped;
    if (this.x<5||this.x>width-5) {
      this.xped*=-1;
    }
    if (this.y<5||this.y>height-5) {
      this.yped*=-1;
    }
  }
}
class eye {

  constructor(x, y) {
    this.flag=false;
    this.flag2=false;
    this.x=x;
    this.y=y;
    this.down=random(0, 30);
    this.up=random(-30, 0);
    this.upp=this.up;
    this.downn=this.down;
    this.c=color(random(255), random(255), random(255));
    this.eyeC=color(random(255), random(255), random(255));
    this.eyeC2=color(random(255), random(255), random(255));
    this.upped=this.up/8;
    this.downped=this.down/8;
    this.eyex=x;
    this.eyey=y;
    this.eyeSize=random(10, 20);
    this.w=50;
  }
  draw() {

    fill(255);
    stroke(255);
    beginShape();
    vertex(this.x- this.w, this.y);
    bezierVertex(this.x-20, this.y+30, this.x+20, this.y+30, this.x+this.w, this.y);
    bezierVertex(this.x+20, this.y-30, this.x-20, this.y-30, this.x-this.w, this.y);
    endShape();

    //
    noStroke();
    fill(this.eyeC);
    ellipse(this.eyex, this.eyey, 30, 30);
    fill(this.eyeC2);
    ellipse(this.eyex, this.eyey, this.eyeSize, this.eyeSize);
    let px=(mouseX-this.eyex)*0.005;
    let py=(mouseY-this.eyey)*0.005;
    //if (mousePressed) {
    this.eyex+=px;
    this.eyey+=py;
    //}
    if (this.eyex<(this.x-15)) {
      this.eyex=this.x-15;
    }
    if (this.eyex>(this.x+15)) {
      this.eyex=this.x+15;
    }
    if (this.eyey<(this.y-5)) {
      this.eyey=this.y-5;
    }
    if (this.eyey>(this.y+5)) {
      this.eyey=this.y+5;
    }
    //
    fill(this.c);
    stroke(this.c);
    beginShape();
    vertex(this.x-this.w, this.y);
    bezierVertex(this.x-20, this.y+30, this.x+20, this.y+30, this.x+this.w, this.y);
    bezierVertex(this.x+20, this.y+this.down, this.x-20, this.y+this.down, this.x-this.w, this.y);
    endShape();
    ///up   240  220
    beginShape();
    vertex(this.x-this.w, this.y);
    bezierVertex(this.x-20, this.y+this.up, this.x+20, this.y+this.up, this.x+this.w, this.y);
    bezierVertex(this.x+20, this.y-30, this.x-20, this.y-30, this.x-this.w, this.y);
    endShape();
  }
  move() {
    if (this.flag) {
      this.down-=this.downped;
      if (this.down<0) {
        this.down=0;
        this.downped*=-1;
      }
      if (this.down>this.downn) {
        this.down=this.downn;
        this.downped*=-1;
        this.flag=false;
      }
    }
    //up
    if (this.flag2) {
      this.up-=this.upped;
      if (this.up>0) {
        this.up=0;
        this.upped*=-1;
      }
    }
    if (this.up<this.upp) {
      this.up=this.upp;
      this.upped*=-1;
      this.flag2=false;
    }
  }
}
