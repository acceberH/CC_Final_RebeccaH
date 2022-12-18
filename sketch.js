let img_w=[];//Create an array of women's images
let img_m=[];//Create an array of men's images
var num=10;//horizontal number of eyes
var num2=8;//The vertical number of eyes
let eyes=[];//Create an array of eyes
let balls=[];//Create an array of tears
var x=0, y=0;//The distance between the x and y directions of the eyes (position)
let back;//cover the background image of the eyes
let back2;//Background picture of covering ears
let back3;//Cover mouth background picture
let end_img;//The last explosion image
let particles=[];//Create an array of explosion effect particles

function preload() {
  for (let i=0; i<3; i++) {
    img_w[i]=loadImage("w"+i+".png"); //load women pics
    img_m[i]=loadImage("m"+i+".png");//load men pics
  }
  back=loadImage("back.png");
  back2=loadImage("back2.png");
  back3=loadImage("back3.png");
  end_img=loadImage("img.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);//full screen
  imageMode(CENTER);
  tim=0;
  scaNum=2;//The number of pictures displayed by men and women
  x=(width/num);//Calculate the x-direction spacing of the eyes
  y=(height/num2);//Calculate the y-direction spacing of the eyes
  //The for loop traverses the number of horizontal eyes and the number of vertical eyes
  for (let i=0.5; i<num; i++) {
    for (let j=0.5; j<num2; j++) {
      eyes.push(new eye(i*x, j*y)); //Add eyes to the obtained position
    }
  }
  
  for (let i=0; i<200; i++) {
    particles.push(new particle());//Add one particle effect at a time
  }
}
var index=0;//The subscript of the image array
var scaNum=2;//The number of pictures displayed by men and women (single direction (horizontal and vertical))
var tim=0;//time
let isEnd=0;//The interface where the program runs is initially 0
let alpha=255;//The transparency of the image mosaic
function draw() {
  //if the interface is 0
  if (isEnd==0) {
    tim++;//time increase
    background(0);
    ///If the time is within 5-20
    if (tim>5&&tim<=20) {
      scaNum=4;//The number of horizontal and vertical pictures is 4
    } else if (tim>20&&tim<=60) { //if the time is within 20-60
      scaNum=8;///The two-way number of pictures is 8
    } 
    let w=width/scaNum;//Define the width of the picture as the canvas width/number of horizontal pictures
    let h=height/scaNum;///Define the height of the picture as the canvas height/the number of vertical pictures
    ///If the number of pictures is not 8
    if (scaNum!=8) {
      //The for loop arranges horizontal and vertical pictures to cover the canvas
      for (let i=0; i<w; i++) {
        for (let j=0; j<h; j++) {
          if ((i+j)%2==0) { ///The position of the algorithm to obtain the picture If the picture of the lady is displayed at this position
            image(img_w[index], w/2+i*w, h/2+j*h, w, h); ///The image is centered, so half the size of the image needs to be added initially
          } else { ///Otherwise display men's pictures
            image(img_m[index], w/2+i*w, h/2+j*h, w, h);
          }
        }
      }
    }
    ///If the number of pictures is 8
    if (scaNum==8) {
      ///Double-layer for loop traverses the width and height of the background image (canvas width and height) and increments by 10 each time
      for (let i=0; i<back. width; i+=10) {
        for (let j=0; j<back. height; j+=10) {
          noStroke();
          if (index==0) { //If it is a picture covering eyes
            let r=red(color(back.get(i, j))); //Get the red phase value of the background image covering the eyes
            let g=green(color(back.get(i, j)));//Get the green phase value of the background image covering the eyes
            let b=blue(color(back.get(i, j)));//Get the blue phase value of the background image covering the eyes
            fill(r, g, b, alpha); //Fill the acquired rgb value + transparency
          }
          if (index==1) { //If it is a picture covering ears
            let r=red(color(back2.get(i, j)));
            let g=green(color(back2.get(i, j)));
            let b=blue(color(back2.get(i, j)));
            fill(r, g, b, alpha);//
          }
          if (index==2) {//If it is a picture covering the mouth
            let r=red(color(back3.get(i, j)));
            let g=green(color(back3.get(i, j)));
            let b=blue(color(back3.get(i, j)));
            fill(r, g, b, alpha);
          }
          rect(i, j, 10, 10); // Draw a rectangle (mosaic) for the position of the value obtained by the for loop
        }
      }
      alpha-=30;//Transparency reduction (disappears gradually)
      if (alpha<0) { //if invisible
        if (index<2) { ///If the subscript of the picture array is still less than 2 (not the last picture (covering the mouth))
          index++; //Subscript continues +1
          tim=0;//time reset to zero
          scaNum=2;//The number of pictures is restored to 2
          alpha=255;//The transparency is restored to 255
        } else {
          isEnd=1;///otherwise the interface value is 1
        }
      }
    }
  }
  //If the interface value is 1 (eye interface)
  if (isEnd==1) {
    background(0);
    t++;//The time of the current interface
    //for loop to traverse the length of the eye array
    for (let i=0; i<eyess. length; i++) {
      eyess[i].draw(); //call eye behavior
      eyess[i].move(); //call eye behavior
      balls.push(new ball(eyess[i].x+20, eyess[i].y));//Add tears to each eye position
    }
    ///The for loop traverses the length of the eye array
    for (let i=0; i<eyess. length; i++) {
      balls[i].draw();//Call the class behavior of tears
    }
    ///If the time of the current interface is greater than 400
    if (t>400) {
      isEnd=2;///Interface value is 2
      background(0);//Refresh the black background (because the third interface (explosion interface does not need background refresh, refreshing here will overwrite the previous things (equivalent to clearing the screen)))
    }
  }
  if (isEnd==2) { ///If the interface value is 2
    //The for loop traverses 200 times
    for (let i=0; i<200; i++) {
      particles[i].draw();// particle effect
    }
  }
}
let t=0;//The time of the eye interface

function mousePressed() {
  ///click mouse
  for (let i=0; i<eyess.length; i++) {
    eyess[i].flag=true;/// flag boolean and flag2 boolean are true in all eye classes (blink)
    eyess[i].flag2=true;
  }
}
//tears
class ball {
  constructor(x, y) {
    this.yped=random(0.5, 1);//drop speed
    this.x=x;//x loc
    this.y=y;//y loc
    this.alpha=255;
    this.aped=random(2, 4);//Transparency attenuation speed random
  }
  ///Draw tears and tears falling down
  draw() {  
    noStroke();
    fill(119, 193, 222, this.alpha);
    ellipse(this.x, this.y, 10, 17);
    this.y+=this.yped;
    this.alpha-=this.aped;
    //if the transparency of this tear decays to less than 0
    if (this.alpha<0) {
      balls.splice(1, 1); // remove this tear from the array
    }
  }
}
///The final particle effect class
class particle {
  constructor() {
    this.x=width/2;
    this.y=height/2;
    ///The movement speed in the x direction and y direction is a random value between -3 - 3
    this.xped=random(-3, 3);
    this.yped=random(-3, 3);
  }
  draw() {
    noStroke();
    ///Get the color of the picture where the particle is located and assign it to c
    let c=color(end_img.get(this.x, this.y));
    fill(c);//fill the circle with this color
    ellipse(this.x, this.y, 10, 10);
    ///Update position
    this.x+=this.xped;
    this.y+=this.yped;
    //Determine if the circle touches the edge of the canvas, bounce and move
    if (this.x<5||this.x>width-5) {
      this.xped*=-1;
    }
    if (this.y<5||this.y>height-5) {
      this.yped*=-1;
    }
  }
}
///eyes
class eye {
  constructor(x, y) {
    this.flag=false;//Define whether the lower half of the eyes blink or not
    this.flag2=false;//Switch whether the upper half of the eyes blink
    this.x=x;//The position of the eyes
    this.y=y;
    this.down=random(0, 30);//The initial position of the lower eyelid is random
    this.up=random(-30, 0);//The initial position of the upper eyelid is random
    this.upp=this.up;//Get a copy of the initial eyelid position
    this.downn=this.down;//Get a copy of the initial eyelid position
    this.c=color(random(255), random(255), random(255));//The color of eyelids
    this.eyeC=color(random(255), random(255), random(255));///eye color
    this.eyeC2=color(random(255), random(255), random(255));//eye color
    this.upped=this.up/8;//The blinking speed of the upper eyelid
    this.downped=this.down/8;//The blinking speed of the lower eyelid
    this.eyex=x;//eyeball position
    this.eyey=y;//eyeball position
    this.eyeSize=random(10, 20);//The size of the eyeball
    this.w=50;//The width of the eyes
  }
  draw() {
    //draw eyes
    fill(255);
    stroke(255);
    beginShape();
    vertex(this.x- this.w, this.y);
    bezierVertex(this.x-20, this.y+30, this.x+20, this.y+30, this.x+this.w, this.y);
    bezierVertex(this.x+20, this.y-30, this.x-20, this.y-30, this.x-this.w, this.y);
    endShape();

    noStroke();
    fill(this.eyeC);
    ellipse(this.eyex, this.eyey, 30, 30);

    fill(this.eyeC2);
    ellipse(this.eyex, this.eyey, this.eyeSize, this.eyeSize);
    /// Get the distance between the mouse and the eyeball
    let px=(mouseX-this.eyex)*0.005;
    let py=(mouseY-this.eyey)*0.005;
    ///The position of the eyeball moves to the mouse position
    this.eyex+=px;
    this.eyey+=py;
    ///Set the boundary value for the eyeball (place the eyeball to move out of the eye)
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
    //draw eyelids
    fill(this.c);
    stroke(this.c);
    beginShape();
    vertex(this.x-this.w, this.y);
    bezierVertex(this.x-20, this.y+30, this.x+20, this.y+30, this.x+this.w, this.y);
    bezierVertex(this.x+20, this.y+this.down, this.x-20, this.y+this.down, this.x-this.w, this.y);
    endShape();
    
    beginShape();
    vertex(this.x-this.w, this.y);
    bezierVertex(this.x-20, this.y+this.up, this.x+20, this.y+this.up, this.x+this.w, this.y);
    bezierVertex(this.x+20, this.y-30, this.x-20, this.y-30, this.x-this.w, this.y);
    endShape();
  }
  //blink
  move() {
    if (this.flag) { //If the lower eyelid switch is true
      this.down-=this.downped; //The position of the lower eyelid moves
      //if the position of the eyelid is less than 0, move in the opposite direction
      if (this.down<0) {
        this.down=0;
        this.downped*=-1;
      }
      /// if the position of the eyelid is greater than the initial position
      if (this.down>this.downn) {
        this.down=this.downn; //The position of the eyelid is the initial position
        this.downped*=-1;//The speed is the opposite speed (for the next blink)
        this.flag=false;//The blink switch is false
      }
    }
    //up
    if (this.flag2) { //If the upper eyelid switch is true
      this.up-=this.upped; ///The position of the upper eyelid moves
      if (this.up>0) { ///If the upper eyelid position is greater than 0, move in the opposite direction
        this.up=0;
        this.upped*=-1;
      }
    }
    if (this.up<this.upp) { ///If the position of the eyelid is smaller than the initial position
      this.up=this.upp; ///The eyelid position is the initial position
      this.upped*=-1; ///The movement speed is the opposite speed (for the next blink)
      this.flag2=false; ///The upper eyelid blink switch is false
    }
  }
}
