import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import './Style.css';
import Jeu from './Jeu.js';
import Accueil from '../Accueil/Accueil.jsx';
import RePlay from '../Replay/Replay.jsx';
import Classement2 from '../Classement/Classement.jsx';
import config from '../Config.js';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSocket } from '../../SocketContext.js';




export default function TestSockets() {

    
    const canvasRef = useRef(null);
    const [accueil, setAccueil] = useState(true);
    const [replay, setReplay] = useState(true);
    const [theSkin, setTheSkin] = useState(1);
    const [score, setScore] = useState(0);
    const [beginPartie, setBeginPartie] = useState(false);
    const GameRef = useRef(null);
    const name = Cookies.get("name");
    const { socket } = useSocket();

    const setScore2 = async (theScore, skin) => {
        //todo en pushant faut decommenter
        console.log('name', name);
        console.log(theScore);
         await axios.post("/api/test", {name: name, score: theScore, skin: "1"});
    }

    

    const showReplay = (skin) => { //skin
        
        setTheSkin(skin);
        setReplay(false);
        EmitEvent();
        socketSkin(skin);
        socket.emit("name", name);
        initGame();
        GameRef.current.rePlay(skin);

    };

    const AccueilState = (value) => { //name
        setAccueil(false);
        setReplay(true);
       // connectToServer(value);
    }

    const initGame = () => {
        GameRef.current = Jeu('CanvaGame', socket, setReplay, setScore2);
    };





    // const connectToServer = (name) => {  // connexion au serveur qui englobe tout
    //     const newSocket = io(config.apiUrl, {
    //         path: '/socket.io',
    //     });
    //     setSocket(newSocket); // enregistrement de la state socket
    //     newSocket.emit("name", name);
    //     GameRef.current = Jeu('CanvaGame', newSocket);
    //     GameRef.current.rePlay(1);
    // };



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

  
        
    const EmitEvent = () => {
        if (socket) {
            console.log("play ?")
            socket.emit("play", "7"); //play
        }

    };

    useEffect(() => {
        
        if (socket) {  // si la connexion est établi alors on écoute
            socket.on('userConnected', (message) => {
                // console.log(message);
                
            });

            socket.on('skin', (message) => {
                // rien pour l'instant
            })

            socket.on('userDisconnected', (message) => {
                // console.log(message);
               
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

        const handleKeyDown = (event) => {
            if (event.code === 'Space' || event.code === 'ArrowUp') {
                // if (socket)
                //     socket.emit("jump", "0"); //saut
                GameRef.current.jump();
            }
          }
        window.addEventListener('keydown', handleKeyDown);
        // window.addEventListener('touchstart', handleTouch);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // window.removeEventListener('touchstart', handleTouch);
        };
    },[GameRef]);

    useEffect(() => {
        if (replay === true)
        canvasRef.current.style.opacity = '0.75';
        else{
            canvasRef.current.style.opacity = '1';
        }
    },[replay])

    useEffect(() => {
        return () => {
            if (GameRef.current)
                GameRef.current.stop();
        };
        
       
    },[])

    useEffect(() => {
        AccueilState(name);
    },[]);

   
    return (
        <div className='all-container'>
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

            </div> 
           
            {replay && <RePlay score={score} skin={theSkin} showReplay={showReplay}/>}
           
        </div>
        </div>
    );
}

//  {accueil && <Accueil setAccueil={AccueilState} />} 
//  {replay && <Classement2/>}

//