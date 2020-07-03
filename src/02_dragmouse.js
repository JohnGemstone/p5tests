import p5 from "p5";
import * as dat from 'dat.gui';

export default function() {


    const containerElement = document.getElementById('p5');

    //Controls
    let controls = {
        brushsize: 30,
        dampen: 0.2,
        alpha: 10,
        colour: [ 0, 128, 255 ],
      };
      console.log(controls)
    
    let mouseIsPressedDOM = false;
      
    window.onload = function() {
        var gui = new dat.GUI();
        gui.add(controls, "brushsize", 1, 300)
        gui.add(controls, "dampen", 0.01, 1)
        gui.add(controls, "alpha", 0.01, 255)
        gui.add(controls, "colour")
      };
    
    const sketch = (p) => {

        // globals
        let res, moupos, plotpos, coord, plotrad, minrad, dist, click, dia, uioverlay, layer01;
        res = p.createVector(window.innerWidth,window.innerHeight-1)
        moupos = p.createVector(0,0)
        plotpos = p.createVector(0,0)
        coord = [0,0]
        
    
        p.setup = function() {
            
            p.createCanvas(res.x, res.y)
            uioverlay = p.createGraphics(res.x, res.y)
            layer01 = p.createGraphics(res.x, res.y)
            p.background(0)
            uioverlay.clear()
            layer01.clear()
    
        }
    
        //DRAW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        p.draw = function() {

            //reset globals
            moupos.set(p.mouseX,p.mouseY)
            uioverlay.clear()
            p.clear()
            p.background(0)
            coord = smoothVector()

            //draw tool
            if (mouseIsPressedDOM) {
                //normalBrush(layer01)
                softBrush(layer01)
                
            }

            //uioverlay.background(p.random(255))
            //drawCirc(uioverlay)
            
            p.image(layer01, 0, 0)
            p.image(uioverlay, 0, 0)


            
        }

        //FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!

        function normalBrush(layer){
            
            layer.noStroke()
            layer.rect(
                coord[0] - (controls.brushsize/2), // x pos
                coord[1] - (controls.brushsize/2), // y pos
                controls.brushsize, // width
                controls.brushsize, // height
                0) // roundness

                
        }

        function softBrush(layer) {
            layer.noStroke();
            for (let i = controls.brushsize; i > 0; i--) {
                layer.blendMode(layer.SCREEN)
              const step = i / controls.brushsize;
              const alpha = p.lerp(controls.alpha,0.0,step)
              const colour = [255,255,255,alpha];
              layer.fill(colour);
              layer.ellipse(coord[0], coord[1], step * controls.brushsize, step * controls.brushsize);
              //console.log(alpha)
            }
          }

      
        function drawCirc(layer){
            layer.noFill()
            layer.stroke(255)
            layer.ellipse(moupos.x, moupos.y, controls.brushsize, controls.brushsize)
        }

        function smoothVector(){
            //dampen movement

            let dampen = controls.dampen

            if (mouseIsPressedDOM === true) {

                let x = plotpos.x + ((moupos.x - plotpos.x) * dampen )
                let y = plotpos.y + ((moupos.y - plotpos.y) * dampen )
                let coord = [x,y]
                plotpos.set(x,y)
                
                //layer01.ellipse(x, y, controls.brushsize, controls.brushsize)
                return coord

                 
            } else {

               plotpos.set(moupos.x,moupos.y)

            } 
           
            //else plot vector 
        }

        p.windowResized = function() {
            p.resizeCanvas(window.innerWidth, window.innerHeight)
            
        };
    };
    
    
    containerElement.addEventListener("mousedown",function(event) {  mouseIsPressedDOM = true })
    containerElement.addEventListener("mouseup",function(event) {  mouseIsPressedDOM = false })

    containerElement.addEventListener("touchstart",function(event) {  mouseIsPressedDOM = true })
    containerElement.addEventListener("touchend",function(event) {  mouseIsPressedDOM = false })
    
    new p5(sketch, containerElement);
    

}

