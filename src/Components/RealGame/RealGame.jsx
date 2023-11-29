import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './Style.css';
import Jeu from './Jeu.js';
import Accueil from '../Accueil/Accueil.jsx';
import RePlay from '../Replay/Replay.jsx';
import Classement2 from '../Classement2/Classement2.jsx';



export default function TestSockets() {

    const url = "https://sea-lion-app-yadoj.ondigitalocean.app";
    const [test, setTest] = useState(false);
    
    const canvasRef = useRef(null);
    const [socket, setSocket] = useState(null); // on crée un state socket
    const [connect, setConnect] = useState(false);
    const [accueil, setAccueil] = useState(true);
    const [replay, setReplay] = useState(false);
    const [theName, setName] = useState("");
    const [theSkin, setTheSkin] = useState(1);
    const [score, setScore] = useState(0);
    const GameRef = useRef(null);

    

    const showReplay = (skin) => { //skin
        
        setTheSkin(skin);
        setReplay(false);
        EmitEvent();
        socketSkin(skin);
        GameRef.current.rePlay(skin);
    };

    const AccueilState = (value) => { //name
        setName(value);
        setAccueil(false);
        setReplay(true);
        connectToServer(value);
    }


    const connectToServer = (name) => {  // connexion au serveur qui englobe tout
        const newSocket = io(url, {
            path: '/socket.io',
        });
        setSocket(newSocket); // enregistrement de la state socket
        newSocket.emit("name", name);
        GameRef.current = Jeu('CanvaGame', newSocket);
        
         GameRef.current.rePlay(1);
        
        setConnect(true);
    };

    const Deconnexion = () => { // on deconnecte
        if (socket) {
            socket.disconnect();
            setTest(false);}
    };

    const socketSkin = (skin) => { 
        let skinStr = 'default_skin';
        if (skin === 1)
            skinStr = 'default_skin';
        else if (skin === 2)
            skinStr = '2';
        else if (skin === 3)
            skinStr = '3';
        if (socket) {
            socket.emit("skin", skinStr);
    }};

    const handleKeyDown = (event) => {
            if (event.code === 'Space' || event.code === 'ArrowUp') {
                if (socket)
                    socket.emit("3sdC", "0"); //saut
            }
          }
        
    const EmitEvent = () => {
        if (socket) {
            
            socket.emit("diEh", "7"); //play
        }

    };

    useEffect(() => {
        
        if (socket) {  // si la connexion est établi alors on écoute
            socket.on('userConnected', (message) => {
                console.log(message);
                if (message)
                    setTest(true);
            });

            socket.on('userDisconnected', (message) => {
                console.log(message);
                setTest(false);
            });

            socket.on('lostServer', (message) => {
                setReplay(true);
            });

            socket.on('ScoreLost', (score) => {
                    setScore(score);
                
            });
        }

        return () => {  // on démonte les ecouteurs
            if (socket) {
                socket.off('userConnected');
                socket.off('userDisconnected');
            }
        };
    }, [socket]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        // window.addEventListener('touchstart', handleTouch);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // window.removeEventListener('touchstart', handleTouch);
        };
    },[socket]);

    useEffect(() => {
        if (replay === true)
        canvasRef.current.style.opacity = '0.75';
        else{
            canvasRef.current.style.opacity = '1';
        }
    },[replay])

   

//className='absolute h-5/6 w-full flex items-end flex-row justify-start '
//className='  h-screen w-full flex justify-center items-center '
    return (
        <div id="containerGame" >
            <div id="containerCanva" className='rounded' >
                <canvas
                        id = "CanvaGame"
                        ref={canvasRef}
                        width={1000}
                        height={450}
                        style = {{width: '100%', height: '100', overflow: 'hidden', position: 'relative' }} 
                        className="rounded-lg "
                />
                {/* <Game/> */}
            </div> 
            {accueil && <Accueil setAccueil={AccueilState} />}
            {replay && <RePlay score={score} skin={theSkin} showReplay={showReplay}/>}
            {replay && <Classement2/>}
            
            {/* <div className='absolute h-3/6 w-32 border border-slate-500 rounded md-text-sm text-base hidden sm:block text-left text-left m-4 p-4'>
                <p className='mb-2 mt-2 font-bold'>Connexion<span className='text-green-600'></span></p>
                <div className=''>
                    {test && <p>Connecté </p>}
                </div>
                <button onClick={Deconnexion} className='border border-black'>Deconnexion</button>
               {!connect && <button onClick={connectToServer} className='border border-black'>Connexion</button>}
                <button onClick={EmitEvent} className='border border-black'>Play</button>
            </div> */}
        </div>
    );
}
