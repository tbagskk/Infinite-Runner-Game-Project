import React, { useRef, useEffect, useState } from 'react';
import './Classement.css';
import {chooseSkinReactStr} from '../ChooseSkin';
import Droite from '../../Images/droite2.png';
import Gauche from '../../Images/gauche.png';
import Img1 from '../../Images/Perso1.png';
import Img2 from '../../Images/chat3.png';
import Img3 from '../../Images/capybara.png';
import axios from 'axios';


export default function Classement2({RePLay}){

    const [users, setUser] = useState([]);

    // const url = "https://sea-lion-app-yadoj.ondigitalocean.app/scores";
    const url = "http://10.18.207.221:3001/scores";

    // const chooseSkin = (value) => {
        
    //     if (value === 'default_skin')
    //         return (Img1);
    //     else if (value === '2') 
    //         return (Img2);
    //     else if (value === '3')
    //         return (Img3);
    // };


    const getUsers = async () => {
            try {
            const response = await axios.get(url);
            const sortedUsers = response.data.sort((a, b) => b.score - a.score);

            // Limiter à 10 utilisateurs
            const limitedUsers = sortedUsers.slice(0, 9);
            console.log(response)
            setUser(limitedUsers);
            ;}
            
            catch (error) {
                console.error("Erreur lors de la récup des users");
                throw error;
            }
        }

        useEffect(() => {
            getUsers();
        },[])

    
    return (
        <div id="ContainerClassement" className='rounded-lg'>
            <div id="ClassementTitre" className='rounded-lg'>
                <p>World Ranking</p>
            </div>
            <div id="ContainerPlayer">
            {users.map((user, index) => (
                <div key={index} id="PlayerChild" className='rounded-lg'>
                    <div id="RankPlayerchild">
                    <p>{index + 1}</p>
                    </div>
                    <div id="ContenuPlayerChild">
                    <div id="ImgPlayerChild">
                        <img src={chooseSkinReactStr(user.skin)} alt={`Joueur ${index + 1}`} />
                    </div>
                    <div id="NamePlayerChild">
                        <p className="text-l">{user.name.slice(0,7)}</p>
                    </div>
                    <div id="ScorePlayerChild">
                        <p className="text-l">{user.score}</p>
                    </div>
                    </div>
                </div>
            ))}
        </div>
            

        </div>
    )
    
}