import {chooseSkin} from '../ChooseSkin';
import ennemy from './Enemy';
import gift1 from '../../Images/gift.png';
import Bg1 from '../../Images/bgSapin8.png';
import jumpSong from '../../Sons/jump2.mp3'
import chockSong from '../../Sons/chock.mp3'
import Musique from '../../Sons/Musique2.mp3';
import { Time } from 'phaser';


let JumpSong = document.createElement("audio");
JumpSong.src = jumpSong;
let ChockSong = document.createElement("audio");
ChockSong.src = chockSong;
let muse = document.createElement("audio");
muse.src = Musique;
muse.volume = 0.005;
JumpSong.volume = 0.1;
ChockSong.volume = 0.1;
      
let Cube = [];
let CubeClient = [];
let animationId;
let startGame;
let totalSeconds = 0;
let lastFrameTime = 0;

let User = {
 
}

let Property = {
  
}


function initAll(skin){
    startGame = performance.now();
    Property = {
        velocityY : 0,
        gravity : 1,
        ground : 450,
        speed:1.5,
        userGround: 400,
        TimeEnemy: 700,
        SendEnemy: false,

    }
    User = {
        x : 350,
        y : 400,
        width : 50,
        height : 50,
        jumpCount:0,
        score:0,
        skin:skin,
    };
   
    CubeClient = [];

}

function collision(player, enemy) {


    return (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    );
  }

  const backgroundImage = new Image();
  const gift = new Image();
  backgroundImage.src = Bg1;
  gift.src = gift1;

function draw(delta, context, canvas) {

        

        totalSeconds += delta;
        var vx = (300);  // correspond à la vitesse de défilement = 100 pixels/sec

        var numImages = Math.ceil(canvas.width / backgroundImage.width) + 1;
        var xpos = (totalSeconds * vx) % backgroundImage.width;

        context.save();
        context.translate(-xpos, 0);
        
        for (var i = 0; i < numImages; i++) {
            context.drawImage(backgroundImage, i * backgroundImage.width, 0);
        }
        context.restore();

    context.drawImage(chooseSkin(User.skin),User.x,User.y, User.width, User.height);
    CubeClient.forEach(cub => {
            
        // context.fillRect(cub.x  , cub.y , cub.width ,cub.height   );
        context.drawImage(gift,cub.x  , cub.y , cub.width ,cub.height   );
      });
}

export default function GamePlay(canvasId, socket)
{
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');


    

    socket.on('UserY', (data) => {
    });

    socket.on('Enemy', (data) => {
            Property.SendEnemy = true;
    });

    socket.on('Lost', (data) => {
        // cancelAnimationFrame(animationId);
    });

    socket.on('Speed', (data) => {
        Property.speed += 0.1;
    });

    socket.on('Score', (data) => {
        User.score = data;
    });

    

    socket.on('nbrPlayer', (data) => {
        console.log("nbr de joueur", data);
    });
  
    let lastTime = 0;
    let count = 0;
    let TimeEnemy = 0;

    function loop(currentTime)

    {
        
        animationId = requestAnimationFrame(loop);
        var now = performance.now();
        var deltaSeconds = (now - lastFrameTime) / 1000; // duree en seconde depuis la derniere frame
        lastFrameTime = now;


        const delta = (currentTime - lastTime) / 20 ; // le delta
        lastTime = currentTime;
        context.clearRect(0, 0, canvas.width, canvas.height);

        User.y = Math.min(User.y + Property.velocityY * delta , 400);  // gravité
        Property.velocityY += Property.gravity * delta ;  // gravité


        

        draw(deltaSeconds,context, canvas);
        
        context.font = 'bold 30px Poppins';
        context.fillStyle = 'black';
        context.imageSmoothingQuality = 'high';
        context.fillText(User.score, 30, 50);
        count = Math.floor((now - startGame) / 15);


        if (User.y === Property.userGround)
            User.jumpCount = 0;
        

        CubeClient.forEach(cub => {
            
            cub.x -= (10 * Property.speed) * delta;
            if (collision(User, cub)){
                ChockSong.currentTime = 0;
                ChockSong.play();
                muse.pause();
                socket.emit("528=", "19"); // lost
                cancelAnimationFrame(animationId);
            }
          });


          if (CubeClient.length > 100)
          {
            CubeClient.shift();
          }

          if (Property.SendEnemy === true){
                if (now - TimeEnemy > Property.TimeEnemy){
                    TimeEnemy = now;
                    ennemy(CubeClient, Property.ground)
                }
          }

          
          
        

    };


    function startJump() 
    {
      
        if (User.y === Property.userGround)
        {
            User.jumpCount++;
            Property.velocityY = -18;
            JumpSong.play();
        } 
        else if (User.jumpCount === 1)
        {
            User.jumpCount++;
            Property.velocityY = -12;
            JumpSong.play();
        }
    }
    

    function rePlay(skin) {
        muse.currentTime = 0;
         muse.play();
        initAll(skin);
        animationId = requestAnimationFrame(loop);
    };



    function handleKeyDown(event) {
         if (event.code === 'Space' || event.code === 'ArrowUp'){
            startJump();
         }
         
         
    }
    
    document.addEventListener('keydown', handleKeyDown);

    function removeEventListeners() {
        document.removeEventListener('keydown', handleKeyDown);
        
    }

    return {
        start: function() {

        },
        jump: function() {

        },
        rePlay: function(skin){
            rePlay(skin);
        },
        removeEventListeners
    }
}