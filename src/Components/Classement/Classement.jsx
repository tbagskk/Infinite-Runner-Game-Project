import React, { useEffect, useState } from 'react';
import './Classement.css';
import {chooseSkinReactStr} from '../ChooseSkin';
import axios from 'axios';
import config from '../Config';


export default function Classement2(){

    const [users, setUser] = useState([]);


    const getUsers = async () => {
            try {
            const response = await axios.get(config.apiUrl + config.endpointScore);
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