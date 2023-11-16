import React, { useRef, useEffect, useState } from 'react';
import franceFlag from './francepng.png';
import algerie from './algerie.svg';

const VoteComponent = () => {
  const canvasRef = useRef(null);
  const [votes, setVotes] = useState({ France: 10, Allemagne: 10 });
  const [franceFlagImage, setFranceFlagImage] = useState(null);
  const [algerieFlagImage, setAlgerieFlagImage] = useState(null);
  const [what, setWhat] = useState(1);

  useEffect(() => {
    const image = new Image();
    image.src = franceFlag;
    image.onload = () => {
      setFranceFlagImage(image);
    };

    const image2 = new Image();
    image2.src = algerie;
    image2.onload = () => {
        setAlgerieFlagImage(image2);
    };
  }, []);

  const changeWhat = () => {
    setWhat(what + 1);
  }

  const handleVote = (sign) => {

    let country;

    if (what % 2 === 0)
    {
        country = 'France';
        if (sign === '+')
            setVotes((prevVotes) => ({ ...prevVotes, [country]: prevVotes[country] + 1 }));
        else
        {
            if (votes['France'] >= 2)
                setVotes((prevVotes) => ({ ...prevVotes, [country]: prevVotes[country] - 1 }));
        }
            
    }
    else
    {
        console.log("caca");
        country = 'Allemagne';
        if (sign === '+')
            setVotes((prevVotes) => ({ ...prevVotes, [country]: prevVotes[country] + 1 }));
        else
        {
            if (votes['Allemagne'] >= 2)
                setVotes((prevVotes) => ({ ...prevVotes, [country]: prevVotes[country] - 1 }));
        }
}
  };



  const drawCircles = () => {

  
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    var raf;
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var grille = {
        cellSize: 40,
        gridColor: 'lightgray',
        draw: function () {
          for (let y = 0; y < canvas.height; y += this.cellSize) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
            context.strokeStyle = this.gridColor;
            context.stroke();
            context.closePath();
          }
    
          for (let x = 0; x < canvas.width; x += this.cellSize) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
            context.strokeStyle = this.gridColor;
            context.stroke();
            context.closePath();
          }
        },
      };

    var ball = {
       x : (canvas.width - 150 ) / 3,
        y: -10,
        vx: 0,
        vy: 1.2,
        radius: 5,
        color: "blue",
        draw: function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
  },
    };

    
function draw() {
    context.clearRect(ball.x - ball.radius - 1, ball.y - ball.radius - 1, ball.radius * 2 + 2, ball.radius * 2 + 2);

    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    raf = window.requestAnimationFrame(draw);
  }
  
//   canvas.addEventListener("mouseover", function (e) {
//     raf = window.requestAnimationFrame(draw);
//   });
  
//   canvas.addEventListener("mouseout", function (e) {
//     window.cancelAnimationFrame(raf);
//     // grille.draw();
//   });

 


    // le quadrillage

   
   
    ball.draw();

    // le cercle 1

    const Draw1 = () => {

        if (franceFlagImage) {
            const imageWidth = votes['France'] * 20;
            const imageHeight = votes['France'] * 20;
            const x = (canvas.width - imageWidth) / 4;
            const y = (canvas.height - imageHeight) / 2;
            context.imageSmoothingEnabled = true;
      
            // Appliquer un masque circulaire à l'image du drapeau de la France
            context.save();
            context.beginPath();
            context.arc(x + imageWidth / 2, y + imageHeight / 2, imageWidth / 2, 0, 2 * Math.PI);
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.stroke();
            context.closePath();
            context.clip();
      
            context.drawImage(franceFlagImage, x , y, imageWidth, imageHeight);
            context.restore();
          }

    }

    //le cercle 2

    const Draw2 = () => {

        if (algerieFlagImage) {
            const imageWidth = votes['Allemagne'] * 20;
            const imageHeight = votes['Allemagne'] * 20;
            const x = (canvas.width - imageWidth) * 3 / 4 ;
            const y = (canvas.height - imageHeight) / 2;
            context.imageSmoothingEnabled = true;
      
            // Appliquer un masque circulaire à l'image du drapeau de la France
            context.save();
            context.beginPath();
            context.arc(x + imageWidth / 2, y + imageHeight / 2, imageWidth / 2, 0, 2 * Math.PI);
            
            context.lineWidth = 2;
            context.strokeStyle = 'black';
            context.stroke();
            context.closePath();
            context.clip();
      
            context.drawImage(algerieFlagImage, x , y, imageWidth, imageHeight);
            context.restore();
          }

    }

// pour faire en sorte que le plus grand sois SUR le plus petit

    if (votes['France'] > votes['Allemagne'])
    {
        Draw2();
        Draw1();
        raf = window.requestAnimationFrame(draw);
    }
    else
    {
        Draw1();
        Draw2();
    }

  };

  // pour le mouvement



  useEffect(() => {
    drawCircles();
  }, [votes, franceFlagImage, algerieFlagImage]);

  return (
    <div className='bg-white-200 h-screen w-full flex justify-center items-center flex-col min-h-full'>
      <div className='bg-white-200 h-screen w-full flex justify-center items-center'>
        <canvas
          ref={canvasRef}
          width={1200}
          height={700}
          style = {{width: '99%', height: '1000', overflow: 'hidden', position: 'relative' }} 
          className="border border-gray-500"
        />
      </div>
      <div className='bg-white h-14 w-4/5 flex justify-center items-center mt-5 absolute bottom-16 rounded border border-black justify-between px-10'>

            <div className='w-20 '>
                <p className=''>
                    {votes['France']}
                </p>
            </div>
        <div className=' w-52'>
            <button onClick={() => handleVote('+')} className='h-10 w-48 rounded border border-black active:h-12 active:w-52'> + </button>
        </div>

            <img onClick={() => changeWhat()} 
                                alt="" 
                                className='h-10 w-10 rounded-full cursor-pointer border border-black' 
                                src={what % 2 === 0 ? franceFlag : algerie}>
            </img>
            <div className=' w-52'>
        <button onClick={() => handleVote('-')} className='h-10 w-48 rounded border border-black active:h-12 active:w-52'> - </button>
            </div>

            <div className='w-20 '>
            <p>
                {votes['Allemagne']}
            </p>
            </div>
      </div>
    </div>
  );
};

export default VoteComponent;
