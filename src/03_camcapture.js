import p5 from "p5";
import * as dat from 'dat.gui';

export default function() {


    const containerElement = document.getElementById('p5');

    const sketch = (p) => {

        // globals
        let res, cam;
        res = p.createVector(window.innerWidth,window.innerHeight)

    
        p.setup = function() {
            p.createCanvas(res.x, res.y)
            cam = p.createCapture(p.VIDEO)

            p.background(0)

            console.log(cam);
            console.log(p);
    
        }
    
        //DRAW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        p.draw = function() {

        }


        //FUNCTIONS!!!!!!!!!!!!!!!!!!!!!!!!!!

        p.windowResized = function() {

            p.resizeCanvas(window.innerWidth, window.innerHeight)
            
        };
    };
    
    
    new p5(sketch, containerElement);
    

}

