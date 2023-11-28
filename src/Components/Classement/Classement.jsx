import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Img1 from '../../Images/Perso1.png';
import Img2 from '../../Images/Perso1.png';
import Img3 from '../../Images/red.png';

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
        updatedAllUser = updatedAllUser.slice(0, 9);
        setAllUser(updatedAllUser);
        ;}
        
        catch (error) {
            console.error("Erreur lors de la récup des users");
        }
    }

    const getSkin = (value) => {
        if (value === 'default_skin')
            return (Img1);
        else if (value === '2')
            return (Img2);
        else if (value === '3')
            return (Img3);
    };


    

    useEffect(() => {
        getUsers();
    },[game]);

    useEffect(() => {
        getUsers();
    },[]);

    return (
        
        <div className='border border-black bg-white h-96 w-52 rounded absolute right-20  text-xl'>
            <p className='mb-2 mt-2 font-bold'>CLASSEMENT</p>
            {allUser.map((user) => (
               <div className=" border flex justify-between px-4 mb-1" key={user.id}>
                <img className="h-8 border border-black rounded-full w-8" src={getSkin(user.skin)}/>
                <p>{user.name.slice(0,7)}</p>
                <p>{user.score}</p>
                </div>
            ))}
        </div>
       
        

    )
}