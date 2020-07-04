import * as p5 from "p5"
import 'p5/lib/addons/p5.dom.js'
import * as dat from 'dat.gui'


export default function() {

    const containerElement = document.getElementById('p5');

    const sketch = (p) => {

        let res, cam, theShader, webgl, count;
        res = p.createVector(window.innerWidth,window.innerHeight)
        
        p.preload = function(){
            theShader = p.loadShader('./src/shaders/webcam.vert', './src/shaders/webcam.frag');
          }

        p.setup = function() {
            console.log(p);

            p.createCanvas(res.x, res.y)
            p.background(0)
            p.noStroke()

            webgl = p.createGraphics(res.x, res.y, p.WEBGL)

            cam = p.createCapture(p.VIDEO);
            cam.size(res.x,res.y)
            cam.hide()
            
            count = 0

        }
    
        p.draw = function() {
            webgl.shader(theShader)
            theShader.setUniform('tex0',cam)
            //console.log(p.scale);
            //p.filter(p.INVERT);
            let h = 19
            let scan = p.mouseY
            webgl.rect(0,0,res.x,res.y)
            p.image(
                webgl,
                0,scan,res.x,h,
                0,scan,res.x,h)

            p.fill("white")
            //p.rect(0,0,100,100)
            count = count%res.y
            count = count + 1
        }

        p.windowResized = function() {

            p.resizeCanvas(window.innerWidth, window.innerHeight)
            
        };
    };
    
    new p5(sketch, containerElement);
    
}

