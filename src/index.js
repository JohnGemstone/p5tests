import p5 from "p5";

const containerElement = document.getElementById('p5');


const sketch = (p) => {
  let res = [window.innerWidth,window.innerHeight]
  let x = 100;
  let y = 100;
  let counter = 0;
  let curpos, prevpos, radius;
  
  

  p.setup = function() {
    p.createCanvas(res[0], res[1]);
    p.frameRate(10)
    console.log(p)
  };

  p.draw = function() {
    let fps = p.frameRate();
    //p.background(0);
    p.fill(255);
    p.noStroke();

    //get prev pos
    if (curpos == undefined) {
        prevpos = [0,0]
    } else {
        prevpos = curpos
    }

    //get cur pos
    curpos = [p.mouseX,p.mouseY];

    radius = p.dist(prevpos[0], prevpos[1], curpos[0], curpos[1])

    if (p.mouseIsPressed) {
        p.fill(0);
      } else {
        p.fill(255);
      }
    
    p.ellipse(p.mouseX, p.mouseY, radius*2, radius*2);

    

    // counter ++
    // p.fill(255);
    // p.textAlign("CENTER");
    // p.strokeWeight(4);
    // p.stroke(0);
    // p.text(fps,res[0]/2,res[1]/2)




    
  };
};

new p5(sketch, containerElement);