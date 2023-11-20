import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Img1 from './francepng.png';


export default function Name({close}){

    const [name, setName] = useState(null);
    const [theDiv, setDiv] = useState(true);

    const url = "/api/test";

   
   
   
    const test2 = async () => {

        setDiv(false);
        close();
        const response = await axios.post("/api/test", { name: name});
        console.log("caca");
        
        // console.log("caca");
        const cookieHeaderValue = response.headers['Set-Cookie'];
        console.log(cookieHeaderValue);
        // const score = await axios.post("/api/addScore", {name: name, score: 800});
    }

    const handleNameChange = (event) => {

       

        const UserCookie = {
            name: event.target.value,
            skin: "2",
        }
        const userJSON = JSON.stringify(UserCookie);
        setName(event.target.value);
        Cookies.set('user', userJSON);
        // setCookie();
      }


    return (
        <div className='absolute  h-40 w-80'>
        {theDiv && (<div className='bg-slate-600 border rounded  h-40 w-80 absolute flex justify-center items-center flex-col '>
          
            <input 
                type="text"
                placeholder='Your Name'
                className='rounded w-52 h-14 flex justify-center items-center text-center border border-red-200'
                onChange={handleNameChange}
            />
            
            <button onClick={test2} className='w-52 h-8 bg-white rounded mt-2 active:bg-white' disabled={!name}>
                Enter
            </button>
 
        </div>)}
        </div>

    )
}