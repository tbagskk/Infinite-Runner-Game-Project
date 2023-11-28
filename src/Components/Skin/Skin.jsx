import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Img1 from '../../Images/Perso1.png';
import Img2 from '../../Images/Perso1.png';
import Img3 from '../../Images/Perso1.png';


export default function Skin({setCookie, closeSkin}){

    const ChooseImg = (value) => {

        if (value === 1)
            putCookie('default_skin');
        else if (value === 2)
            putCookie('2');
        else if (value === 3)
            putCookie('3');
        
        setCookie();
        closeSkin();
    };

    const putCookie = (value) => {

        let currentCookieValue = Cookies.get('user'); 
        let user = JSON.parse(currentCookieValue);
        user.skin = value;
        let updatedCookieValue = JSON.stringify(user);
        Cookies.set('user', updatedCookieValue);
    };
    
    return (
        <div className='absolute  h-40 w-80'>
            
            <div className='bg-slate-600 border rounded  h-40 w-80  flex justify-between items-center flex-col p-4 '>
            <p className='text-zinc-50 font-semibold'> Choose your skin </p>
          <div className='h-40 w-80  flex justify-between items-center flex-row p-4 '>
                <img onClick={() => {ChooseImg(2)}} className='cursor-pointer border-black border h-20 w-20 rounded-full' src={Img2}/>

                <img onClick={() => {ChooseImg(1)}} className='cursor-pointer border-black border h-20 w-20 rounded-full' src={Img1}/>

                <img onClick={() => {ChooseImg(3)}} className='cursor-pointer border-black border h-20 w-20 rounded-full' src={Img3}/>
        </div>
            
        
            

            </div>
        </div>

    )
}