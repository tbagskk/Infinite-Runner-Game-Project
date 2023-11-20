import jeuImg from './map3.png';
import FrImg from './francepng.png';
import AlImg from '../Home/algerie.svg';
import axios from 'axios';
import Musique from './Musique2.mp3';
import Img3 from '../../Images/chat2.png';
import Img4 from '../../Images/red.png';

export default function test(canvasId, onGameOver, name, ChangeScore, skin) 
{

    let height = 500;
    let width = 1200;
    let status = false;
    let velocityY = 0;
    let gravity = 0.6;
    let dinoY = 500 - 50 ;
    let cubes = [];
    var totalSeconds = 0;
    var lastFrameTime = 0;
    var startTime = 0;
    var lastTextUpdateTime = 0;
    var score = 0;
    let speed = 1;
    let intervalId;
    let animationId;

    let muse = document.createElement("audio");
    muse.src = Musique;

    // let animationId;
let lastTime = 0;
let enemyInterval = 800;
    

    let dino = {
        x: 250,
        y: dinoY,
        velocity: 0,
        isJumping: false,
        jumpStart: 0,
        isCollised: false,
        jumpCount: 0,
    };

    function resetGame() {
        status = false;
        velocityY = 0;
        gravity = 0.6;
        dinoY = 500 - 50;
        cubes = [];
        totalSeconds = 0;
        lastFrameTime = 0;
        startTime = 0;
        lastTextUpdateTime = 0;
        score = 0;
        speed = 1;
    
        dino = {
          x: 250,
          y: dinoY,
          velocity: 0,
          isJumping: false,
          jumpStart: 0,
          isCollised: false,
          jumpCount: 0,
        };
      }


    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    const backgroundImage = new Image();

    const skinFrance = new Image();
    const skin2 = new Image();
    const skin3 = new Image();
    const skin4 = new Image();

    backgroundImage.src = jeuImg;
    skinFrance.src = FrImg;
    skin2.src = Img3;
    skin3.src = Img4;


    
    // fonction qui se lance dès le lancement de la page

    // window.onload = function(){
    //     requestAnimationFrame(loop);
    //     startTime = performance.now();
    //     intervalId = setInterval(ennemy, 800);
    // };


    function chooseSkin(skin)
    {
        if (skin === "default_skin")
            return (skinFrance);
        else if (skin === "2")
            return (skin2);
        else if (skin === "3")
            return (skin3);
    }

    function Collision(xRed, yRed, xBlack, yBlack, widthRed, heightRed, widthBlack, heightBlack) 
    {
        if (
            xRed < xBlack + widthBlack &&
            xRed + widthRed > xBlack &&
            yRed < yBlack + heightBlack &&
            yRed + heightRed > yBlack
        ) {
            status = true;
             onGameOver(false);
             setScore();
            //  ChangeScore();
             
        }
    }

    // fonction pour ajouter le score
    
    const setScore = async () => {
        const scoreInit = await axios.post("/api/addScore", {name: name, score: score, skin: skin});

    }

    // boucle principale (infinie) du jeu

    let fps = 60;

    // set the expected frame rate
let frames_per_sec = 60;
let interval = Math.floor(1000 / frames_per_sec);
let startTime2 = performance.now();
let previousTime = startTime2;
let currentTime = 0;
let deltaTime2 = 0;



    function loop(timestamp) 
    { 
        
        


        // draw(deltaSeconds, elapsedTime);
        if (status === false)
        {
            currentTime = timestamp;
            deltaTime2 = currentTime-previousTime;
           
            
            const deltaTime = timestamp - lastTime;
             
            animationId = requestAnimationFrame(loop);
            var now = performance.now();
            var deltaSeconds = (now - lastFrameTime) / 1000;
            lastFrameTime = now;
            var elapsedTime = (now - startTime) / 1000;
    
          
            if (deltaTime2 > interval) {
                previousTime = currentTime-(deltaTime2 % interval);
                draw(deltaSeconds, elapsedTime);
              }
              if (deltaTime >= enemyInterval) {
                ennemy(); // Exécutez la fonction enemy
                lastTime = timestamp; // Mettez à jour le dernier temps
                
              }
        }
        
        else if (status === true)
        {   
            cancelAnimationFrame(animationId);
            muse.pause();
            muse.currentTime = 0;
        }
           
        
        
        //   if (status === true) {
        //   } else {
        //     setTimeout(loop, 1000 / fps);
        //   }

        
    
    }

    function draw(delta,elapsedTime) 
    {

        totalSeconds += delta;
        dino.isCollised = false;

        var timeSinceLastUpdate = elapsedTime - lastTextUpdateTime;

        var vx = (300);  // correspond à la vitesse de défilement = 100 pixels/sec

        var numImages = Math.ceil(canvas.width / backgroundImage.width) + 1;
        var xpos = (totalSeconds * vx) % backgroundImage.width;

        context.clearRect(0, 0, canvas.width, canvas.height);

       

        // Dessiner l'image en arrière-plan
        context.save();
        context.translate(-xpos, 0);
        
        for (var i = 0; i < numImages; i++) {
            context.drawImage(backgroundImage, i * backgroundImage.width, 0);
        }
        context.restore();

        cubes.forEach(cub => {
            context.fillRect(cub.x  , cub.y , cub.xx ,cub.yy   );
            // context.drawImage(skin2,cub.x , cub.y, cub.xx,cub.yy  );
            cub.x -= (10 * speed);
            Collision(dino.x, dino.y, cub.x, cub.y, 50, 50, cub.xx, cub.yy);
          });

        // pour éviter que le tableau soit trop grand

        if (cubes.length > 10)
            cubes.shift();

        // permet de maintenir une gravité constante
        velocityY += gravity;

        dino.y = Math.min(dino.y + velocityY, dinoY);


         // Dessiner le carré rouge
        context.fillStyle = 'red';
        context.drawImage(chooseSkin(skin),dino.x, dino.y, 50, 50);
     
        if (dino.y === dinoY)
            dino.jumpCount = 0;

        score++;

        if (score % 100 === 0)
          speed += 0.05;
        
            context.font = '24px Arial';
            context.fillStyle = 'black';
            context.imageSmoothingQuality = 'high';
            context.fillText(score, 50, 50);

//             const lineWidth = 1;
// context.lineWidth = lineWidth;
// context.strokeStyle = 'black';
// context.strokeText(score, 50, 50);


            context.font = '24px Arial';
            context.fillStyle = 'black';
            context.fillText(name, 900, 50);
            context.imageSmoothingEnabled = false;

       



    }

    function ennemy()
    {

        var nbr = Math.random();

        if (nbr >= 0 && nbr < 0.4)
        {
            const cub = {
                x:1200,
                y:500 - 50,
                xx: 50,
                yy:50,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.4 && nbr < 0.6)
        {
            const cub = {
                x:1200,
                y:500 - 70,
                xx: 70,
                yy:70,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.6 && nbr < 0.8)
        {
            const cub = {
                x:1200,
                y:500 - 90,
                xx: 90,
                yy:90,
            };
            cubes.push(cub);
        }
        else if (nbr >= 0.8 && nbr < 1)
        {
            const cub = {
                x:1200,
                y:300,
                xx: 90,
                yy:90,
            };
            cubes.push(cub);
        }

  
          if (Math.random() < 1) {
              var size = Math.random() * (70 - 20) + 20;
              
          }
    }

    function startJump() 
    {
      
        if (dino.y === dinoY)
        {
            dino.jumpCount++;
            velocityY = -15;
        } 
        else if (dino.jumpCount === 1)
        {
            dino.jumpCount++;
            velocityY = -10;
        }
    }

    function rePlay() {

        clearInterval(intervalId);
        muse.play();
        resetGame();
        setTimeout(() => {
          requestAnimationFrame(loop);
          startTime = performance.now();
        //    intervalId = setInterval(ennemy, 800);
        }, 200); // Ajoutez un délai de 100 millisecondes pour éviter une exécution concurrente
      };
    



    return {
        start: function() {
            
        },
        jump: function() {
            startJump();
        },
        rePlay: rePlay,
    };
}
