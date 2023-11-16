import React, { useRef, useEffect, useState } from 'react';
import test from './test.js';
import Game from './Game.js';





function Dino() {

    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);

    

    useEffect(() => {

        const game = test('test');
        game.start();

        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                game.jump();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [])
  


    return (
   
        <div className='bg-red-200 h-screen w-full flex justify-center items-center flex-col min-h-full'>
            <div className='bg-white-200 h-screen w-full flex justify-center items-center'>
                <canvas
                        id = "test"
                        ref={canvasRef}
                        width={1200}
                        height={500}
                        style = {{width: '99%', height: '100', overflow: 'hidden', position: 'relative' }} 
                        className="border border-gray-500"
                />
            </div>
            
        </div>
    );

}

export default Dino;

