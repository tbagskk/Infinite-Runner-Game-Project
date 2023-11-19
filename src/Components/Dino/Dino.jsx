import React, { useRef, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import Name from '../Name/Name.jsx';
import test from './test.js';
import Game from './Game.js';
import Classement from '../Classement/Classement.jsx';





function Dino() {



    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const [GameState, setGameState] = useState(false);
    const [open, setOpen] = useState(true);
    const gameRef = useRef(null);
    const [name, setName] = useState("");
    const [allUser, setAllUser] = useState([]);

    const url = "/api/getScore";


    const getUsers = async () => {
        try {
        const response = await axios.post(url);
       
        let updatedAllUser = response.data.user.map((user) => {
            return user;
        });
        
        setAllUser(updatedAllUser);
        console.log(allUser);
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
    };
    
    const setNameCookie = () => {
        console.log("cookie caca",Cookies.get('user'));
        setName(Cookies.get('user'));
        gameRef.current = test('test', onGameOver, Cookies.get('user'), getUsers);
    };
    

    useEffect(() => {

        getUsers();
        const handleKeyDown = (event) => {
            if (gameRef.current) {
                if (event.code === 'Space' || event.code === 'ArrowUp') {
                  gameRef.current.jump();
                }
              }
            console.log("saut");
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

       

        

    }, [])


    return (
   
    <div className='absolute bg-slate-600 h-60 w-4/6 flex justify-center items-center flex-row '>
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
            {open && <Name close={close} setCookie={setNameCookie}/>}
            <Classement users={allUser} game={GameState}/>
            
        </div>
    );

}

export default Dino;

