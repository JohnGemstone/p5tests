import * as p5 from "p5"
import 'p5/lib/addons/p5.dom.js'
import * as dat from 'dat.gui'


export default function() {

    const containerElement = document.getElementById('p5');

    //Controls
    let controls = {
        divs: [5,5],
        offset: 0,
        range: 0,
        switch: false,
        };
        
    window.onload = function() {
        var gui = new dat.GUI();
        
        //gui.add(controls, "divs", 0, 30)
        gui.add(controls, "offset", 0, 1)
        gui.add(controls, "range", -2, 2)
        gui.add(controls, "switch")
        };
    
    let mouseIsPressedDOM = false;


    const sketch = (p) => {

        let res, cam, theShader, webgl, u_mouse, c_switch, c_options;
        res = p.createVector(window.innerWidth,window.innerHeight)
        c_switch = false
        c_options = {
            video: {
                facingMode: {
                 exact: "user"
               }
            }
          }
        
        p.preload = function(){
            theShader = p.loadShader('./shaders/disco.vert', './shaders/disco.frag');
          }

        p.setup = function() {
            console.log(p);

            p.createCanvas(res.x, res.y)
            p.background(0)
            p.noStroke()

            cam = p.createCapture(c_options)
            cam.size(res.x,res.y)
            cam.hide()

            webgl = p.createGraphics(res.x, res.y, p.WEBGL)

            // SWITCH BUTTONS
            // switchBtn = p.createButton('Switch Camera');
            // switchBtn.position(19, 19);
            // switchBtn.mousePressed(switchCamera);



        }
    
        p.draw = function() {

            u_mouse = [p.mouseX,p.mouseY]

            webgl.shader(theShader)
            theShader.setUniform('tex0',cam)

            theShader.setUniform('u_res', [res.x, res.y]);
            theShader.setUniform('u_time', p.frameCount * 0.01);
            theShader.setUniform('u_mouse', u_mouse); 
            theShader.setUniform('tex0',cam)

            theShader.setUniform('u_divs',controls.divs)
            theShader.setUniform('u_offset',controls.offset)
            theShader.setUniform('u_range',controls.range)

            webgl.rect(0,0,res.x,res.y)

            p.image(webgl,0,0,res.x,res.y)

            if (mouseIsPressedDOM==true) {
                controls.divs[0] = Math.floor((p.mouseX / res.x) * 30);
                controls.divs[1] = Math.floor((p.mouseY / res.y) * 40);
            }

            if (controls.switch != c_switch) {
                switchCamera();
            }


        }

        function switchCamera() {
            c_switch = controls.switch
            stopCam()
            if (c_switch = true) {
                cam.remove()
                c_options =  {
                    video: {
                        facingMode: {
                         exact: "environment"
                       }
                    }
                  };
            } else {
                cam.remove()
                c_options =  {
                    video: {
                        facingMode: {
                         exact: "user"
                       }
                    }
                  };
            }
            cam = p.createCapture(c_options)
            cam.size(res.x,res.y)
            cam.hide()

        }
        function stopCam() {
            let stream = cam.elt.srcObject;
            let tracks = stream.getTracks();
          
            tracks.forEach(function(track) {
              track.stop();
            });
          
            cam.elt.srcObject = null;
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


console.log("est")