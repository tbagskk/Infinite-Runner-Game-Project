import React, { useRef, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import Name from '../Name/Name.jsx';
import test from './test.js';
import Game from './Game.js';





function Dino() {

    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [GameState, setGameState] = useState(false);
    const [open, setOpen] = useState(true);
    const gameRef = useRef(null);
    const [name, setName] = useState("");



    const onGameOver = (result) => {
        setGameState(result);
      };

     
      const RePlay = () => {
        if (gameRef.current) {
            gameRef.current.rePlay();
            setGameState(true);
        }
    };
    
    const close = (name) => {
        setOpen(false);
    };
    
    const setNameCookie = () => {
        console.log("cookie caca",Cookies.get('user'));
        setName(Cookies.get('user'));
        gameRef.current = test('test', onGameOver, Cookies.get('user'));
    };
    

    useEffect(() => {

        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                gameRef.current.jump();
            }
            console.log("saut");
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
                        width={1000}
                        height={500}
                        style = {{width: '80%', height: '100', overflow: 'hidden', position: 'relative' }} 
                        className="border  rounded "
                />
            </div>
            {!GameState && (<button onClick={RePlay} className='rounded border border-black absolute flex justify-center items-center h-12 w-28'>
                Play
            </button>) }
            {open && <Name close={close} setCookie={setNameCookie}/>}
            
        </div>
    );

}

export default Dino;

