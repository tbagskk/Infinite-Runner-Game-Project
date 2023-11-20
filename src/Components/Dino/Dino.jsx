import React, { useRef, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import Name from '../Name/Name.jsx';
import test from './test.js';
import Game from './Game.js';
import Classement from '../Classement/Classement.jsx';
import PlayAgain from '../Replay/Replay.jsx';
import Skin from '../Skin/Skin.jsx';





function Dino() {



    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [GameState, setGameState] = useState(false);
    const [open, setOpen] = useState(true);
    const gameRef = useRef(null);
    const [name, setName] = useState("");
    const [allUser, setAllUser] = useState([]);
    const [skinWindow, setSkinWindow] = useState(false);



    const [inGame, setInGame] = useState(false); // etat du jeu (en cours ou pas)

    const url = "/api/getScore";


    const getUsers = async () => {
        try {
        const response = await axios.post(url);
       
        let updatedAllUser = response.data.user.map((user) => {
            return user;
        });
        
        setAllUser(updatedAllUser);
        setAllUser("caca");
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
        setName(UserName);
        gameRef.current = test('test', onGameOver, UserName, getUsers, skin);
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

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleKeyDown);
        };

    }, [])

    const testSpace = (event) => {
        if (event.code === 'Space'|| event.code === 'ArrowUp')
            if (gameRef.current)
                if((GameState === false) && (open === false))
                    RePlay();

    }

    useEffect(() =>{
        window.addEventListener('keydown', testSpace);
    return () => {
      window.removeEventListener('keydown', testSpace);
    };
    },[GameState, open])


    return (
   
    <div className='absolute bg-slate-600 h-72 w-5/6 flex justify-center items-center flex-row '>
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

            {open && <Name close={close} />}

            {!GameState && <Classement users={allUser} game={GameState}/>}

            {skinWindow && <Skin setCookie={setNameCookie} closeSkin={closeSkin}/>}
            
        </div>
    );

}

export default Dino;

