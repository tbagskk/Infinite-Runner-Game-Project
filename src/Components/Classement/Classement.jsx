import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import FranceFlag from './francepng.png';

export default function Classement({game}){

    const [allUser, setAllUser] = useState([]);

    const url = "/api/getScore";

    const getUsers = async () => {
        try {
        const response = await axios.post(url);
       
        let updatedAllUser = response.data.user.map((user) => {
            return user;
        });
        updatedAllUser.sort((a, b) => b.score - a.score);
        updatedAllUser = updatedAllUser.slice(0, 7);
        setAllUser(updatedAllUser);
        ;}
        
        catch (error) {
            console.error("Erreur lors de la récup des users");
        }
    }


    

    useEffect(() => {
        getUsers();
        console.log("game",game);
    },[game]);

    useEffect(() => {
        getUsers();
    },[]);

    return (
        <div className='bg-white h-86 w-52 rounded absolute right-20 text-xl'>
            <p className='mb-4 mt-2 font-bold'>CLASSEMENT</p>
            {allUser.map((user) => (
               <div className=" border flex justify-between px-4 mb-2" key={user.id}>
                <img className="h-8 border border-black rounded-full w-8" src={FranceFlag}/>
                <p>{user.name}</p>
                <p>{user.score}</p>
                </div>
            ))}
        </div>

    )
}