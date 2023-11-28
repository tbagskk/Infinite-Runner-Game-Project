// GameLogic.js
import * as PIXI from 'pixi.js';
import ennemy from './Enemy';
import Bg1 from '../../Images/map3.png';




let backgroundSpeed = 2;
let totalSeconds = 0;

let app;
let isGameRunning = true;
let cubes = [];

let User = {
  x: 50,
  y: 0,
  height: 50,
  width: 50,
}

let Property = {
  velocityY : 0,
  gravity : 0.6 ,
  ground : 500,
  speed: 1,
  enemyInterval : 1000,
  lastEnemyTime : 0,
}

let Enemy = {
  x : 1200,
  y : 350,
  height : 50,
  width : 50,
}


function Jump(){
   Property.velocityY = -15;
}

function createBackground() {
  const texture = PIXI.Texture.from(Bg1);

  const bg1 = new PIXI.Sprite(texture);
  bg1.position.set(0, 0);

  const bg2 = new PIXI.Sprite(texture);
  bg2.position.set(app.screen.width, 0);

  app.stage.addChild(bg1);
  app.stage.addChild(bg2);

  return [bg1, bg2];
}



function generateEnemy() {

  var nbr = Math.random();
  console.log(nbr);

  if (nbr >= 0 && nbr < 0.4){
    Enemy.height = 50;
    Enemy.width = 50;
    Enemy.y = Property.ground - Enemy.height; 
  }
  else if (nbr >= 0.4 && nbr < 0.6){
    Enemy.height = 70;
    Enemy.width = 70;
    Enemy.y = Property.ground - Enemy.height; 
  }
  else if (nbr >= 0.6 && nbr < 0.8){
    Enemy.height = 100;
    Enemy.width = 100;
    Enemy.y = Property.ground - Enemy.height; 
  }
  else if (nbr >= 0.8 && nbr < 1){
    Enemy.height = 100;
    Enemy.width = 100;
    Enemy.y = Property.ground - Enemy.height - 120; 
  }
  
     
  const newEnemy = new PIXI.Graphics();
  newEnemy.beginFill(0x000000);
  newEnemy.drawRect(Enemy.x, Enemy.y , Enemy.width, Enemy.height);
  newEnemy.endFill();
  cubes.push(newEnemy);

}

const generateUser = () => {
  const user = new PIXI.Graphics();
  user.beginFill(0xf00020);
  user.drawRect(200, Property.ground-50, User.width, User.height);
  user.endFill();
  

  return user;
};


function collision(player, enemy) {
  const playerBounds = player.getBounds() ;
  const enemyBounds = enemy.getBounds();
  return (
      playerBounds.x < enemyBounds.x + enemyBounds.width &&
      playerBounds.x + playerBounds.width > enemyBounds.x &&
      playerBounds.y < enemyBounds.y + enemyBounds.height &&
      playerBounds.y + playerBounds.height > enemyBounds.y
  );
}

const initializeGame = () => {

  const canvas = document.getElementById('containerId');

  app = new PIXI.Application({
    width: window.innerWidth,
    height: 500,
    view: canvas,
    backgroundColor: 0xFFFFFF,
    renderType: PIXI.RENDERER_TYPE.CANVAS, // Utilisez le rendu basé sur Canvas
  });
  // document.getElementById('containerId').appendChild(app.view);


  let Cube = generateUser();
  

  let [background1, background2] = createBackground();

  
  //  background.width = app.screen.width;
  app.stage.addChild(Cube); 

 
  const updateBackground = (backgroundSprites) => {
    totalSeconds += app.ticker.deltaMS / 1000;
    const vx = 100; // Vitesse de défilement en pixels/sec
    const deltaPosition = (totalSeconds * vx) % app.screen.width;
  
    backgroundSprites[0].x = -deltaPosition;
    backgroundSprites[1].x = app.screen.width - deltaPosition;
  };
  

  function draw(){
    
       Cube.y = User.y;
       if (cubes.length > 10)
            cubes.shift();
  }


  app.ticker.maxFPS = 30;
  app.ticker.add((delta) => {

    updateBackground([background1, background2]);

      cubes.forEach(cub => { cub.x -= (10 * Property.speed * delta) ; app.stage.addChild(cub); 
        if (collision(Cube, cub))
        {
          app.stop();
        }
      }); // avancement des ennemies
      draw(); // mise a jour des valeurs


      const currentTime = performance.now();  // génération de nouveau ennemies tout les tant de temps
      if (currentTime - Property.lastEnemyTime > Property.enemyInterval) {
        console.log("time",currentTime - Property.lastEnemyTime);
        generateEnemy();
        Property.lastEnemyTime = currentTime;
      }

        Property.velocityY += Property.gravity * delta;  // application de la gravitée
        User.y = Math.min(User.y + Property.velocityY * delta, 0 );  // aplication de la position du joueur

  });

  

  window.addEventListener('keydown', (event) => {
     console.log('Key pressed:', event.key);
    if (event.key === ' ')
      Jump();
  });



  function startGame() {

  }

  return app;
};

export default initializeGame;
