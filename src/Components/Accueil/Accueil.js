import Musique from '../../Sons/musiqueNoel.mp3';
import jumpSong from '../../Sons/jump2.mp3'

import Img1 from '../../Images/sapin.png';
import Img2 from '../../Images/pixel3.png';
import Img3 from '../../Images/flocon.png';
import Tree from "../../Images/tree.webp";

const image = new Image();
const image2 = new Image();
const image3 = new Image();

let muse = document.createElement("audio");
let JumpSong = document.createElement("audio");
JumpSong.src = jumpSong;


let launch = false;

image.src = Img3; 
image2.src = Tree;
image3.src = Img2

muse.src = Musique;
muse.volume = 0.005;

let cub = {
    x:100,
    y:400,
    height:50,
    width:50,   
}

let Property = {
    velocity: 0,
    gravity: 0.6
}

export default function AccueilAnim(canvasId){

    let animationId;
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    
    const snowflakes = Array.from({ length: 30 }, (_, index) => ({
        x: Math.random() * canvas.width,
        y: -20 + Math.random() * (-600 -(-20)),
      }));
      
    function draw(snowflake) {
    context.drawImage(image2, 0, 158, 300, 300);
    context.drawImage(image2, 700, 158, 300, 300);
    }

    let lastTime = 0;
    let lastTimeJump = 0;

    function loop(currentTime){

        let now = performance.now();
        // console.log(now);

        if (launch){
        animationId = requestAnimationFrame(loop);
        const delta = (currentTime - lastTime) / 20 ; // le delta
        lastTime = currentTime;

        // console.log("le detla", delta);
        // console.log("cubY", cub.y);
        // console.log("velocity", Property.velocity);
        // console.log("jump", jump);
        // console.log("cub.x", cub.x);
        // console.log("gravity", Property.gravity);

        cub.x += 1 * delta;

        cub.y = Math.min(cub.y + Property.velocity * delta , 400);
        Property.velocity += Property.gravity * delta ;

        if (now - lastTimeJump > 2000){
            lastTimeJump = now;
            Property.velocity = -15;


        }
        // jump += 1 * delta ;
            
        
        if (cub.x > 1000)
            cub.x = -100;

        context.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.sort((a, b) => a.zIndex - b.zIndex);
   
        draw();

        snowflakes.forEach((flake) => {
            flake.y += 1 * delta;
           // context.drawImage(image, flake.x, flake.y, 40, 40);
            if (flake.y > 450) {
                flake.x = Math.random() * canvas.width;
                flake.y = -20 + Math.random() * (-600 -(-20));
            }
        });
        context.drawImage(image3, cub.x  , cub.y , cub.width ,cub.height   );
        
    }
    }

    function replayMuse(){
        muse.currentTime = 0;
        // muse.play();
    }

    function rePlay(){
        launch = true;
        requestAnimationFrame(loop);
        replayMuse();
    }
    muse.addEventListener('ended', replayMuse);

    
    return {
        start: function() {},
        rePlay: function() {rePlay()},
        stop: function(){
            launch = false;
             muse.pause();
             JumpSong.pause();
             cancelAnimationFrame(animationId);
        }
    }
}