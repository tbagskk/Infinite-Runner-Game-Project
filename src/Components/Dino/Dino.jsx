import React, { useRef, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import Name from '../Name/Name.jsx';
import GamePlay from '../../GamePlay/GamePlay.js';
import Classement from '../Classement/Classement.jsx';
import Skin from '../Skin/Skin.jsx';
import Infos from '../Infos/Infos.jsx';





function Dino() {



    const canvasRef = useRef(null);
    const [GameState, setGameState] = useState(false);
    const [open, setOpen] = useState(true);
    const gameRef = useRef(null);
    const [allUser, setAllUser] = useState([]);
    const [skinWindow, setSkinWindow] = useState(false);

    const url = "/api/getScore";

    const getUsers = async () => {
        try {
        const response = await axios.post(url);
       
        let updatedAllUser = response.data.user.map((user) => {
            return user;
        });
        
        setAllUser(updatedAllUser);
        ;}
        
        catch (error) {
            console.error("Erreur lors de la récup des users");
        }
    }



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
        setSkinWindow(true);
    };

    const closeSkin = () =>{
        setSkinWindow(false);
    };
    
    const setNameCookie = () => {

        const userJSON = Cookies.get('user');
        const user = JSON.parse(userJSON);
        const UserName = user.name;
        const skin = user.skin;
        gameRef.current = GamePlay('test', onGameOver, UserName, getUsers, skin);
    };
    

    useEffect(() => {

        getUsers();
        const handleKeyDown = (event) => {
            if (gameRef.current) {
                if (event.code === 'Space' || event.code === 'ArrowUp') {
                  gameRef.current.jump();

                  
                }
              }


            
        }

        const handleTouch = (event) => {
            if (gameRef.current) {
              
                  gameRef.current.jump();

                  
                
              }}

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouch);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouch);
        };

    }, [])

    

    useEffect(() =>{
        const testSpace = (event) => {
            if (event.code === 'Space'|| event.code === 'ArrowUp')
                if (gameRef.current)
                    if((GameState === false) && (open === false))
                        RePlay();
    
        }

        window.addEventListener('keydown', testSpace);
    return () => {
      window.removeEventListener('keydown', testSpace);
    };
    },[GameState, open])


    return (
   
    <div className='absolute  h-full  w-5/6 flex justify-center items-center flex-row '>
            <div className='  h-screen w-full flex justify-center items-center '>
                <canvas
                        id = "test"
                        ref={canvasRef}
                        width={1000}
                        height={500}
                        style = {{width: '100%', height: '100', overflow: 'hidden', position: 'relative' }} 
                        className="border bg-white rounded black"
                />
            </div>
            {!GameState && (<button onClick={RePlay} className='rounded border border-black absolute flex justify-center items-center h-12 w-28'>
                Play
            </button>) }

            {open && <Infos />}
            
            {open && <Name close={close} />}

            {!GameState && <Classement users={allUser} game={GameState}/>}

            {skinWindow && <Skin setCookie={setNameCookie} closeSkin={closeSkin}/>}

            
            
        </div>
    );

}

export default Dino;

