import React, { useCallback, useEffect, useState } from 'react';
import {chooseSkinReact} from '../ChooseSkin';
import './Replay.css';
import Droite from '../../Images/droite2.png';
import Gauche from '../../Images/gauche.png';

import Img1 from '../../Images/pixel3.png';
import Img2 from '../../Images/turtle1.png';
import Img3 from '../../Images/pixel2.png';


export default function RePlay({showReplay, skin, score}){

    const [active, setActive] = useState(true);
    const [nbImg, setNbImg] = useState(skin);
    const [centerImage, setCenterImage] = useState(chooseSkinReact(skin));
    

    const closeSkin = useCallback(() => {
        showReplay(nbImg);
        setActive(false);
    }, [showReplay, nbImg]);


    const handleClick = useCallback((value) => {

    
        let nbr = nbImg;
    
        if (value === "droite") { nbr += 1; } else { nbr -= 1; }
        if (nbr > 3) { nbr = 1; }
        if (nbr < 1) { nbr = 3; }
    
    
        if (nbr === 1) {
            setCenterImage(Img1);
            setNbImg(1);
        } else if (nbr === 2) {
            setCenterImage(Img2);
            setNbImg(2);
        } else if (nbr === 3) {
            setCenterImage(Img3);
            setNbImg(3);
        }
    }, [nbImg, setCenterImage, setNbImg]);
    
    const handleKeydown = useCallback((event) => {
        if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'Enter') {
            if (active) {
                closeSkin();
            }
        }
        if (event.code === 'ArrowRight') {
            handleClick("droite");
        } else if (event.code === 'ArrowLeft') {
            handleClick("gauche");
        }
    }, [active, closeSkin, handleClick]);
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [handleKeydown, nbImg]);

    
    return (
        <div  className='replay-conatiner'>
                {active && <div id="PopupPlayer">
                <div id="PopupPicturePlayer">
                    <img  alt="left" onClick={()=>handleClick("gauche")}src={Gauche}className='buttonSkin'></img>
                    <div id="containerImgPlayer"><img alt="skin" id="imgPlayer" src={centerImage}></img></div>
                    <img alt="right" onClick={()=>handleClick("droite")} src={Droite} className='buttonSkin'></img>
                </div>
                <div id="PopupButtonPlayer">
                    <div onClick={closeSkin} id="ScorePopup"  className='rounded-lg '><div id="scoreReplay" className='rounded-lg text-xs font-medium'>Your score</div><div className='rounded-lg text-3xl'>{score}</div></div>
                    <button onClick={closeSkin} id="ButtonPopup"  className='rounded-lg text-3xl'> PLAY </button>
                </div>

            </div>}
            </div>)
    
}