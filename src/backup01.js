import p5 from "p5";

const containerElement = document.getElementById('p5');


const sketch = (p) => {
  let res = [window.innerWidth,window.innerHeight]

  let counter = 0;
  let curpos, plotpos, plotrad, minrad, dist;

  curpos = p.createVector(0,0)
  plotpos = p.createVector(0,0)
  plotrad = 0
  
  

  p.setup = function() {
    p.createCanvas(res[0], res[1]);
    //p.frameRate(10)
    console.log(p)

  };

  p.draw = function() {

    curpos.set(p.mouseX, p.mouseY)

    // DEBUG
    
    // curpos = [counter,counter/2]

    dist = curpos.dist(plotpos)
    minrad = 20
    

    if (dist>minrad&&dist>plotrad/2+minrad) {
        //style
        counter ++
        p.fill(p.color(`hsl(${(counter*182)%360}, 90%, 50%)`))
        p.noStroke()
        
        //draw
        let dia = dist-plotrad/2+minrad
        p.ellipse(curpos.x,curpos.y,dia,dia)
        //p.ellipse(curpos[0],curpos[1],40,40)


        console.log("dist = " + dist + " plotrad = " + plotrad)
        plotpos.set(curpos.x,curpos.y)
        plotrad=dia
        console.log(curpos)
        console.log(dist)
        
        
        p.stroke(0)
        p.ellipse(curpos.x,curpos.y,1,1)
    }
    
  };
};

new p5(sketch, containerElement);
