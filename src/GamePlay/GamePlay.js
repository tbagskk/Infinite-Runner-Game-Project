
// Images du jeu 

import Bg1 from './../Images/map3.png';

// Dépendances

import axios from 'axios';

// Sons

import Musique from '../Sons/Musique2.mp3';

// fonctions / class

import ennemy from './Enemy';
import chooseSkin from './ChooseSkin';
// import { time } from 'console';

export default function GamePlay(canvasId, onGameOver, name, ChangeScore, skin) 
{

// Initialisation des variables;

    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');

    let status = false; 
    let velocityY = 0;
    let gravity = 0.6;
    let dinoY = 500 - 50 ;
    let cubes = [];

    var totalSeconds = 0;
    var lastFrameTime = 0;
    var startTime = 0;
    var score = 0;
    let speed = 1;

    let intervalId;
    let animationId;

    let muse = document.createElement("audio");
    let lastTime = 0;
    let enemyInterval = 800;

    let frames_per_sec = 60;
    let interval = Math.floor(1000 / frames_per_sec);
    let startTime2 = performance.now();
    let previousTime = startTime2;
    let currentTime = 0;
    let deltaTime2 = 0;
    let startGame;


    // les images
    
    const backgroundImage = new Image();
    backgroundImage.src = Bg1;
    
    // sons

    muse.src = Musique;

    // initalisation des objects

    let cube = {
        y: 500,
    }

    let dino = {
        x: 250,
        y: dinoY,
        velocity: 0,
        isJumping: false,
        jumpStart: 0,
        isCollised: false,
        jumpCount: 0,
    };


// fonction pour renitialiser les valeurs du jeu

    function resetGame() {
        status = false;
        velocityY = 0;
        gravity = 0.6;
        dinoY = 500 - 50;
        cubes = [];
        totalSeconds = 0;
        lastFrameTime = 0;
        startTime = 0;
        score = 0;
        speed = 1.2;
    
        startGame = performance.now();
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

// fonction pour gérer les collisions

    function Collision(dino, cub, Red) 
    {
        if (
            dino.x < cub.x + cub.xx &&
            dino.x + Red > cub.x &&
            dino.y < cub.y + cub.yy &&
            dino.y + Red > cub.y
        ) {
            cancelAnimationFrame(animationId);
            status = true;
            onGameOver(false);
            setScore();  
        }
    }


    // fonction pour ajouter le score
    
    const setScore = async () => {
        //todo en pushant faut decommenter
         await axios.post("/api/addScore", {name: name, score: score, skin: skin});
    }

    // boucle principale (infinie) du jeu
    let fps = 0;
    let test =1;
    let time_fps = 0;
    let previous;
    let delta;

    function loop() 
    { 
        dino.isCollised = false;
        var now = performance.now(); // temps actuel (depuis chargement du site)
        fps++;
        if (now - time_fps >= 1000) {
            time_fps = now;
           console.log("fps",fps);
            fps = 0;
        }
        
        if (status === false)
        {
            

//             deltaTime2 = now - previousTime; // duree en millisecondes depuis la derniere frame
            const deltaTime = now - lastTime; //  delta pour bg
            
            animationId = requestAnimationFrame(loop); // mise a jour anim
            
            var deltaSeconds = (now - lastFrameTime) / 1000; // duree en seconde depuis la derniere frame
            lastFrameTime = now;
            var elapsedTime = (now - startTime) / 1000;
            draw(deltaSeconds, elapsedTime);
            test++;

           
            if (now - previousTime > interval) {
                delta = now - previousTime;
//                 console.log("delta ta lere", delta / interval)
                cubes.forEach(cub => {
                    cub.x -= (10 * speed) * delta / interval;
                  });
                velocityY += gravity * delta / interval;
                dino.y = Math.min(dino.y + velocityY * delta / interval, dinoY);

                if (dino.y === dinoY){
                    dino.jumpCount = 0;
                    
//                     velocityY = 0;
                }
                
                previousTime = now;
                test = 0;
                
                
               score = Math.floor((now - startGame) / 15);
               

                if (score % 100 === 0)
                    speed += 0.05;
              }
              if (deltaTime >= enemyInterval) {
                ennemy(cubes, cube); // Exécutez la fonction enemy
                lastTime = now; // Mettez à jour le dernier temps
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
        var vx = (300);  // correspond à la vitesse de défilement = 100 pixels/sec

        var numImages = Math.ceil(canvas.width / backgroundImage.width) + 1;
        var xpos = (totalSeconds * vx) % backgroundImage.width;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        // context.fillStyle = "#FF6969";
        // context.fillRect(0,0,200,200);
       

        // Dessiner l'image en arrière-plan
        context.save();
        context.translate(-xpos, 0);
        
        for (var i = 0; i < numImages; i++) {
            context.drawImage(backgroundImage, i * backgroundImage.width, 0);
        }
        context.restore();

        cubes.forEach(cub => {
            Collision(dino,cub,50);
            context.fillRect(cub.x  , cub.y , cub.xx ,cub.yy   );
          });



        // pour éviter que le tableau soit trop grand

        if (cubes.length > 10)
            cubes.shift();

         // Dessiner le carré rouge
        context.fillStyle = 'red';
        context.drawImage(chooseSkin(skin),dino.x, dino.y, 50, 50);
     
        

        
        
            context.font = '24px Arial';
            context.fillStyle = 'black';
            context.imageSmoothingQuality = 'high';
            context.fillText(score, 50, 50);


            context.font = '24px Arial';
            context.fillStyle = 'black';
            context.fillText(name, 900, 50);
//             context.imageSmoothingEnabled = false;
    }


    
    
// fonction pour le saut

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
//         else if (dino.jumpCount === 2)
// )
//         {
//             dino.jumpCount++;
//             velocityY = 50;
//         }
    }

// fonction pour recommencer à jouer

    function rePlay() {

        clearInterval(intervalId);
        muse.play();
        resetGame();
        setTimeout(() => {
          requestAnimationFrame(loop);
          startTime = performance.now();
        //    intervalId = setInterval(ennemy, 800);
        }, 200); 
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
