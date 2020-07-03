import p5 from "p5";
import * as dat from 'dat.gui';

export default function() {


    const containerElement = document.getElementById('p5');

    //Controls
    let controls = {
        brushsize: 30,
      };
    
    let mouseIsPressedDOM = false;
      
    window.onload = function() {
        var gui = new dat.GUI();
        gui.add(controls, "brushsize", 1, 30)
      };
    
    const sketch = (p) => {

        // globals
        let res, moupos, plotpos, plotrad, minrad, dist, click, dia, uioverlay, layer01;
        res = p.createVector(window.innerWidth,window.innerHeight)
        moupos = p.createVector(0,0)
        plotpos = p.createVector(0,0)
        
    
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
            

            //draw tool
            if (mouseIsPressedDOM) {
                normalBrush(layer01)
            }

            //uioverlay.background(p.random(255))
            drawCirc(uioverlay)
            
            p.image(layer01, 0, 0)
            p.image(uioverlay, 0, 0)

    
        }

        //FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!

        function normalBrush(layer){
            layer.noStroke()
            layer.rect(
                moupos.x - (controls.brushsize/2), // x pos
                moupos.y - (controls.brushsize/2), // y pos
                controls.brushsize, // width
                controls.brushsize, // height
                0) // roundness
        }

        function drawCirc(layer){
            layer.noFill()
            layer.stroke(255)
            layer.ellipse(moupos.x, moupos.y, controls.brushsize, controls.brushsize)
        }

        function mouseVector(){
            //move plot vector based on mouse
            this.plotpos
            //if mouse is clicked
            if (mouseIsPressedDOM) {
                
            } else {
               this.plotpos = moupos
            }
            //--move vector towards new mouse position
            //else plot vector 
        }

        p.windowResized = function() {
            p.resizeCanvas(window.innerWidth, window.innerHeight)
            
        };
    };
    
    
    containerElement.addEventListener("mousedown",function(event) {  mouseIsPressedDOM = true })
    containerElement.addEventListener("mouseup",function(event) {  mouseIsPressedDOM = false })
    
    new p5(sketch, containerElement);
    

}

