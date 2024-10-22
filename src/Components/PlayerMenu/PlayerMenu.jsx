import {useState} from 'react';
import './PlayerMenu.css';
import imgSkin1 from '../../Images/turtle.png';
import imgSkin2 from '../../Images/pixel2.png';
import imgSkin3 from '../../Images/pixel3.png';
import imgLogo  from '../../Images/logoCLIKS.png';
import { useNavigate } from 'react-router-dom';
// import { useSocket } from '../../SocketContext.js';
import Cookies from 'js-cookie';



export default function PlayerMenu() {

    const [skinUsed, setSkinUsed] = useState(0);
    const [name, setName] = useState("");
    const [msgErrorName, setMsgErrorName] = useState(false);
    const navigate = useNavigate();
   // const { socket } = useSocket();

    // FONCTION POUR PARSER LE NOM D'UTLISATEUR
    const handleNameChange = (event) => {
        const newName = event.target.value;
        if (newName.includes(' ')) {
            return;
        }
        const forbiddenCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (forbiddenCharacters.test(newName)) {
            return;
        }
        if (newName.length > 10) {
            return;
        }
        setName(newName);
    };
    

    const ChooseSkin = (value) => {
        setSkinUsed(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name){
            setMsgErrorName(true);
            return;
        }
        // socket.emit("name", name);
        // socket.emit("skin", skinUsed);
        Cookies.set('name', name);
        navigate("/profil");
    };



    return (
        <div className='playerMenu-container'>
            <div className='playerMenu-container-reponsive'>
            <div className='playerMenu-container-menu'>
                <img className="playerMenu-logo" src={imgLogo} alt=""/>
                <form className='playerMenu-form' onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        placeholder="Enter name" 
                        className='playerMenu-input'
                        value={name} 
                        onChange={handleNameChange}>
                    </input>
                    <button type='submit' className='playerMenu-button'>Play</button>
                </form>
                
                <div className='playerMenu-container-skin'>

                    <div className='playerMenu-container-skin-child'>
                        <div className='playerMenu-skin' style={{border: skinUsed === 0 ? "3px solid white" : "none"}} onClick={()=>{ChooseSkin(0)}}>
                            <img alt=""  className="playerMenu-skin-img" src={imgSkin1}></img>
                        </div>
                        <div className='playerMenu-skin' style={{border: skinUsed === 1 ? "3px solid white" : "none"}} onClick={()=>{ChooseSkin(1)}}>
                            <img alt=""  className="playerMenu-skin-img" src={imgSkin2}></img>
                        </div>
                        <div className='playerMenu-skin' style={{border: skinUsed === 2 ? "3px solid white" : "none"}} onClick={()=>{ChooseSkin(2)}}>
                            <img  alt=""  className="playerMenu-skin-img" src={imgSkin3}></img>
                        </div>
                    </div>
                </div>
                {msgErrorName && <p className='player-menu-error'> Please enter a name to start playing. </p>}
            </div>
            <div className='playerMenu-container-infos'>
                <div className='player-menu-infos-scroll'>
                    <div className='player-menu-infos'>
                        <p className='player-menu-infos-title'>What is Cliks ?</p>
                        <p className='player-menu-infos-text'>Cliks is an endless runner game, where the objective is to reach the highest score possible without dying. Discover your friends' scores through the global leaderboard, and if you dare, try to land in the top ranks of the best players.</p>
                    </div>
                </div>
                <div className='player-menu-infos-scroll'>
                    <div className='player-menu-infos'>
                        <p className='player-menu-infos-title'>Updates</p>
                       

                        <div className='player-menu-maj'>
                            <div className='player-menu-container-maj-number'>
                                <div className='player-menu-maj-number'>
                                    <p>Alpha 0.2 </p>
                                </div>
                                <p className='player-menu-maj-date-p'>2023/12/15</p>
                            </div>
                            <p className='player-menu-maj-text-p'>- Christmas update</p>
                            <p className='player-menu-maj-text-p'>- Addition of multiple skins</p>
                            <p className='player-menu-maj-text-p'>- New interface</p>
                        </div>
                       

                        <div className='player-menu-maj'>
                            <div className='player-menu-container-maj-number'>
                                <div className='player-menu-maj-number'>
                                    <p>Alpha 0.1</p>
                                </div>
                                <p className='player-menu-maj-date-p'>2023/11/20</p>
                            </div>
                            <p className='player-menu-maj-text-p'>- First playable version of the game</p>
                            <p className='player-menu-maj-text-p'>- Multiplayer ranking</p>
                            <p className='player-menu-maj-text-p'>- Only one skin available</p>

                        </div>
                    </div>
                    
                </div>
                <p className='player-menu-copyright'> © Copyright 2024 · Cliks.xyz · Mentions légales · Protection des données · CGV</p>
            </div>
           
            </div>
            <ul className="circles">
                <li ><img alt="skin-img" className='li-img' src={imgSkin1}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin2}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin3}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin1}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin2}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin3}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin1}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin2}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin3}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin1}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin2}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin3}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin1}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin2}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin3}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin1}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin2}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin3}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin1}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin2}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin3}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin1}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin2}></img></li>
                <li ><img alt="skin-img" className='li-img' src={imgSkin3}></img></li>
            </ul>
        </div>
    )
}