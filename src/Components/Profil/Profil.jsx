import { useEffect, useState } from 'react';
import './Profil.scss';
import imgSkin1 from '../../Images/turtle.png';
import imgSkin2 from '../../Images/pixel2.png';
import imgSkin3 from '../../Images/pixel3.png';
//import { useSocket } from '../../SocketContext.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profil() {

   // const { socket } = useSocket();
    const [rank, setRank] = useState(null);
    const [infoUser, setInfosUser] = useState(null);
    const name = Cookies.get("name");
    const navigate = useNavigate();

    const url = "/api/getScore";




    const getUsers = async () => {
        try {
        const response = await axios.post(url);
       
        let updatedAllUser = response.data.user.map((user) => {
            return user;
        });
        
       updatedAllUser.sort((a, b) => b.score - a.score);
        setRank(updatedAllUser);
        console.log(updatedAllUser);
        ;}
        
        catch (error) {
            console.error("Erreur lors de la récup des users");
        }
    }

    useEffect(() => {
        getUsers();
    }, []);


    // useEffect(() => {
    //     if (socket) {
    //         socket.emit("profil_info", "profil");
    //     }
    // },[]);

    // useEffect(() => {
    //     if (socket) {
    //         socket.on("score", (arg) => {
    //             arg.sort((a, b) => b.score - a.score);
    //             setRank(arg);
    //             console.log(arg);
    //         });
    //     }
        
    // },[socket]);

    const chooseSkin = (number) => {
        if (number === "default_skin") {
            return imgSkin1;
        } else if (number === "3") {
            return imgSkin2
        } else if (number === "2") {
            return imgSkin3;
        }
    };

    const handleClickToGame = () => {
        navigate('/game');
    };

    useEffect(() => {
        if (rank && name) {
        const foundUser = rank.find(player => player.name === name);
        console.log("found user", foundUser);
        setInfosUser(foundUser);
    }
    },[rank, name]);
    
    return(
        <div className='profil-container'>
            <div className='profil-container-child'>
            <div className='profil-container-container-infos'>
                <div className='profil-container-infos'>
                    <div className='profil-infos-container-img-container'>
                        <div className='profil-infos-container-img'>
                            <img alt="" src={imgSkin1} className='profil-infos-img'/>
                        </div>
                        <div className='profil-container-name'>
                            <p className='profil-name-p'> {name} </p>
                            <p className='profil-rank-p'></p>
                        </div>
                    </div>
                    {rank === null && <div  id="loader_left" className="loader4"></div>}
                    {rank != null && <div  className='profil-infos-container-infos-text'>
                        <p className='profil-infos-name-title'>Best score</p>
                        <p>{infoUser && infoUser.score}</p>
                        <p className='profil-infos-name-title'>Number of games played</p>
                        <p>{infoUser && infoUser.nbgame}</p>
                        <p className='profil-infos-name-title'>My last connection</p>
                        <p>????</p>
                    </div>}
                </div>
                <div className='profil-button-play' onClick={handleClickToGame}>
                    <p>Play</p>
                </div>
            </div>
            <div className='profil-container-rank'>
                {rank === null && <div class="loader4"></div>}
                <p className='profil-rank-title'>World ranking</p>
                <div className='profil-rank-container-top-scroll'>
                    <p id="profil-text-left"className='profil-rank-p-text'>Rank</p>
                    <p className='profil-rank-p-text'>Name</p>
                    <p className='profil-rank-p-text'>Score</p>
                </div>
                <div className='profil-container-rank-scroll'>
                {rank != null && rank.map((player, index) => (
                    <div className='profil-rank-container-player' key={index}>
                        <div className='profil-rank-container-score-skin'>
                            <p>{index + 1}</p>
                            <img alt="skin" className="profil-rank-img" src={chooseSkin(player.skin)}/>
                        </div>
                        <p className='profil-rank-pp'>{player?.name}</p>
                        <p className='profil-rank-pp'>{player?.score}</p>
                    </div>
                ))}
                </div>
            </div>
            </div>
            <p className='player-menu-copyright'> © Copyright 2024 · Cliks.xyz · Mentions légales · Protection des données · CGV</p>
        </div>
    )
}