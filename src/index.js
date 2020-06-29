import p5 from "p5";
import * as dat from 'dat.gui';

const containerElement = document.getElementById('p5');

//Controls
let controls = {
    minrad: 10,
    randmin: 20,
    randmax: 200,
    rand: true
  };

  
window.onload = function() {
    var gui = new dat.GUI();
    gui.add(controls, 'minrad', 0, 50);
    gui.add(controls, 'rand');
    gui.add(controls, 'randmin', 0, 100);
    gui.add(controls, 'randmax', 0, 100);
    console.log(controls)
  };

const sketch = (p) => {
        let counter = 0;
        let res, moupos, plotpos, plotrad, minrad, dist, click, dia;

        res = p.createVector(window.innerWidth,window.innerHeight)
        moupos = p.createVector(0,0)
        plotpos = p.createVector(0,0)
        plotrad = 40
        minrad = controls.minrad
        click = false
        dia = 0
    
        console.log(p)

    p.setup = function() {
        p.createCanvas(res.x, res.y);

    };

    p.draw = function() {

        minrad = controls.minrad
        moupos.set(p.mouseX, p.mouseY)

        dist = moupos.dist(plotpos)

        if (p.mouseIsPressed) {
            click = true
          } else {
            click = false
          }

        if (dist > plotrad/2+minrad && click == true) {

            //style
            counter ++
            let hue = ((counter*181)%360).toFixed(0)
            p.fill(p.color(`hsb(${hue}, 90%, 100%)`))
            p.noStroke()

            
            if (controls.rand == true) {
                dia = minrad + dist-(plotrad/2)
            } else {
                dia = p.random(controls.randmin,controls.randmax)
            }

            //cal angle
            p.angleMode("DEGREES")
            let angle = p.atan2(plotpos.x-moupos.x,plotpos.y-moupos.y)*-1-(p.PI*0.5)

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
