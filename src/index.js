import p5 from "p5";

const containerElement = document.getElementById('p5');


const sketch = (p) => {
  let counter = 0;
  let res, curpos, plotpos, plotrad, minrad, dist;

  res = p.createVector(window.innerWidth,window.innerHeight)
  curpos = p.createVector(0,0)
  plotpos = p.createVector(0,0)
  plotrad = 40
  minrad = 40
  
    console.log(p)
  p.setup = function() {
    p.createCanvas(res.x, res.y);

  };

  p.draw = function() {

   curpos.set(p.mouseX, p.mouseY)
   
   dist = curpos.dist(plotpos)

   if (dist > plotrad/2+minrad) {

    let dia = 40

    //cal angle
    p.angleMode("DEGREES")
    let angle = p.atan2(plotpos.x-curpos.x,plotpos.y-curpos.y)*-1-(p.PI*0.5)
    console.log((angle))

    //draw circle
    let newpos = new p5.Vector.fromAngle(angle,dia)
    newpos.add(plotpos)
    p.ellipse(newpos.x, newpos.y, dia)
    p.ellipse(newpos.x, newpos.y, 1)

    //set plot attributes
    plotrad = dia
    plotpos.set(newpos)


   }
   
    
  };
};

new p5(sketch, containerElement);
