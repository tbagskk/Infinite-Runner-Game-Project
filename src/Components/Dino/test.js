import jeuImg from './mapNight.png';
import FrImg from './francepng.png';
import AlImg from '../Home/algerie.svg';


export default function test(canvasId) 
{

    let height = 500;
    let width = 1200;
    let status = false;
    let velocityY = 0;
    let gravity = .6;
    let dinoY = 500 - 50 ;
    let cubes = [];
    var totalSeconds = 0;
    var lastFrameTime = 0;
    var startTime = 0;
    var lastTextUpdateTime = 0;
    var score = 0;
    let speed = 1;
    
    

    let dino = {
        x: 250,
        y: dinoY,
        velocity: 0,
        isJumping: false,
        jumpStart: 0,
        isCollised: false,
        jumpCount: 0,
    };


    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    const backgroundImage = new Image();
    const skinFrance = new Image();
    const skin2 = new Image();

    backgroundImage.src = jeuImg;
    skinFrance.src = FrImg;
    skin2.src = AlImg;

    // fonction qui se lance dès le lancement de la page

    window.onload = function(){
        requestAnimationFrame(loop);
        startTime = performance.now();
        // console.log("starttime",startTime);
        setInterval(ennemy, 800);
    };


    function Collision(xRed, yRed, xBlack, yBlack, widthRed, heightRed, widthBlack, heightBlack) 
    {
        if (
            xRed < xBlack + widthBlack &&
            xRed + widthRed > xBlack &&
            yRed < yBlack + heightBlack &&
            yRed + heightRed > yBlack
        ) {
            status = true;
        }
    }

    // boucle principale (infinie) du jeu

    function loop() 
    { 
        let animationId = requestAnimationFrame(loop);
        var now = performance.now();
        var deltaSeconds = (now - lastFrameTime) / 1000;
        lastFrameTime = now;
        var elapsedTime = (now - startTime) / 1000;

    draw(deltaSeconds, elapsedTime);
        if (status === true)
            cancelAnimationFrame(animationId);
    
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
        console.log("xpos",xpos);
        context.save();
        context.translate(-xpos, 0);
        
        for (var i = 0; i < numImages; i++) {
            context.drawImage(backgroundImage, i * backgroundImage.width - xpos, 0);
        }
        context.restore();

        cubes.forEach(cub => {
            context.fillRect(cub.x - 2.5 , cub.y - 2.5, cub.xx + 5,cub.yy + 5  );
            context.drawImage(skin2,cub.x , cub.y, cub.xx,cub.yy  );
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
        context.drawImage(skinFrance,dino.x, dino.y, 50, 50);
     
        if (dino.y === dinoY)
            dino.jumpCount = 0;

        score++;

        if (score % 100 === 0)
          speed += 0.05;
        
            context.font = '24px Arial';
            context.fillStyle = 'black';
            context.fillText(score, 50, 50);

       

            

    }

    function ennemy()
    {
        // console.log("jsp");

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
    
    return {
        start: function() {
        },
        jump: function() {
            startJump();
        }
    };
}
