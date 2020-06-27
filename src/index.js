import p5 from "p5";

const containerElement = document.getElementById('p5');


const sketch = (p) => {
  let res = [window.innerWidth,window.innerHeight]
  let x = 100;
  let y = 100;
  let counter = 0;
  let curpos, plotpos, plotrad, radius, dist;
  plotpos = [0,0]
  plotrad = 0
  
  

  p.setup = function() {
    p.createCanvas(res[0], res[1]);
    //p.frameRate(10)
    console.log(p)
  };

  p.draw = function() {
    curpos = [p.mouseX,p.mouseY]

    // DEBUG
    
    // curpos = [counter,counter/2]

    dist = p.dist(curpos[0],curpos[1],plotpos[0],plotpos[1])
    radius = 20
    if (dist>radius&&dist>plotrad/2+radius) {
        //style
        counter ++
        p.fill(p.color(`hsl(${(counter*182)%360}, 90%, 50%)`))
        p.noStroke()
        
        //draw
        let dia = dist-plotrad/2+radius
        p.ellipse(curpos[0],curpos[1],dia,dia)
        //p.ellipse(curpos[0],curpos[1],40,40)


        console.log("dist = " + dist + " plotrad = " + plotrad)
        plotpos=curpos
        plotrad=dia
        console.log(curpos[0])
        
        
        p.stroke(0)
        p.ellipse(curpos[0],curpos[1],1,1)
    }
    
  };
};

new p5(sketch, containerElement);
