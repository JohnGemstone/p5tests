import p5 from "p5";

const containerElement = document.getElementById('p5');


const sketch = (p) => {
  let counter = 0;
  let res, moupos, plotpos, plotrad, minrad, dist;

  res = p.createVector(window.innerWidth,window.innerHeight)
  moupos = p.createVector(0,0)
  plotpos = p.createVector(0,0)
  plotrad = 40
  minrad = 40
  
    console.log(p)
  p.setup = function() {
    p.createCanvas(res.x, res.y);

  };

  p.draw = function() {

   moupos.set(p.mouseX, p.mouseY)
   
   dist = moupos.dist(plotpos)

   if (dist > plotrad/2+minrad) {

    let dia = minrad + dist-(plotrad/2)
    //let dia = p.random(10,300)

    //cal angle
    p.angleMode("DEGREES")
    let angle = p.atan2(plotpos.x-moupos.x,plotpos.y-moupos.y)*-1-(p.PI*0.5)
    console.log((angle))

    //draw circle
    let newpos = new p5.Vector.fromAngle(angle,(dia/2)+(plotrad/2))
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
