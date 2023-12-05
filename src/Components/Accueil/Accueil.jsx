import React, { useCallback, useRef, useEffect, useState } from 'react';
import './Accueil.css';
import AccueilAnim from './Accueil.js';
import Img1 from '../../Images/pixel3.png';


export default function Accueil({setAccueil, putName}){
    const canvasRef = useRef(null);

    const [GameAccueil, setGameAccueil] = useState("");
    const [name, setName] = useState("");
    const [active, setActive] = useState(true);
    
    

    const clickPlay = useCallback(() => {
        if (name){
            setActive(false);
            setAccueil(name);
            GameAccueil.stop();
        }
    }, [name, setActive, setAccueil, GameAccueil]);

    const nameChange = (event) => {
        const inputValue = event.target.value;
        if (/\s/.test(inputValue) || /[^\w\s]/.test(inputValue)) {return;}
        if (inputValue.length > 10) {return;}
        setName(event.target.value);
    };

    
  
    useEffect(() => {
    const Game = AccueilAnim("CanvaAccueil");
    setGameAccueil(Game);
    Game.rePlay(); 
      }, []);

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.code === 'Enter' || event.code === 'Space')
            {
                if (name)
                    clickPlay();
                    
                
            }
        };
    
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },[name, clickPlay])

    return (
        
        <div id="ContainerAccueil">
             {active && <div id="PopupName">
                <div id="PopupPicture">
                    <img alt="popup" id="imgPopup" src={Img1}></img>
                </div>
                <div id="PopupInput">
                <input 
                    className='rounded-lg text-3xl'
                    type="text"
                    placeholder="Enter your name"
                    id="PopupInputChild"
                    value={name}
                    onChange={nameChange}
                />
                <button onClick={clickPlay} id="ButtonPopup"  className='rounded-lg text-3xl'> PLAY </button>
                </div>

            </div>}
            
            <canvas
                        id = "CanvaAccueil"
                        ref={canvasRef}
                        width={1000}
                        height={450}
                        style = {{width: '100%', height: '100', overflow: 'hidden', position: 'relative' }} 
                        className="bg-white rounded-lg "
                />
               
        </div>
       
        

    )
}