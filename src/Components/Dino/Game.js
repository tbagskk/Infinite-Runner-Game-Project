export default function test(canvasId) {

    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');

    let velocityY = 0;
    let gravity = .4;

    let dinoY = 500 - 50 ;

    let dino = {
        x: 0,
        y: dinoY,
        velocity: 0,
        isJumping: false,
        jumpStart: 0,
        isCollised: false,
    };

    window.onload = function(){
        requestAnimationFrame(update);
    };

    function update(){
        requestAnimationFrame(update);

        context.clearRect(0, 0, canvas.width, canvas.height);

        velocityY += gravity;

        
        // dino.x += 10;
        // if (dino.x > 1200)
        //     dino.x = 0;

        
        // if (dino.isJumping) {
            dino.y = Math.min(dino.y + velocityY, 450);
            // dino.isJumping = false;
            // const elapsedTime = performance.now() - dino.jumpStart;

            // if (elapsedTime < 250) {
            //     dino.y -= 10;
                
            // } else if (dino.y < 450) {
            //         dino.y += 15;
                    
            // } else {
            //     dino.isJumping = false;
            //     dino.velocity = 0;
            //     //  dino.y = 450;
            //     console.log("height", dino.y);
            // }
        // }
        context.fillStyle = 'black';
        context.fillRect(dino.x , dino.y, 50,50 );


        
    }

    function startJump(){
        // if (!dino.isJumping) {
            // dino.isJumping = true;
            velocityY = -10;
            // dino.jumpStart = performance.now();
            
        // }

    }
    

    return {
        start: function() {
            // update();
        },
        jump: function() {
            startJump();
        }
    };
}