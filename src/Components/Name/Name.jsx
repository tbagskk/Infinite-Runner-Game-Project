import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Name({close, setCookie}){

    const [name, setName] = useState(null);
    const [theDiv, setDiv] = useState(true);

    const url = "/api/test";

   
   
   
    const test2 = async () => {

        setDiv(false);
        close();
        const response = await axios.post("/api/test", { name: name});
        // const score = await axios.post("/api/addScore", {name: name, score: 800});
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
        Cookies.set('user', event.target.value);
        setCookie();
      }


    return (
        <div className='absolute  h-40 w-80'>
        {theDiv && (<div className='bg-red-600 border rounded border-black h-40 w-80 absolute flex justify-center items-center flex-col '>
          
            <input 
                type="text"
                placeholder='Your Name'
                className='rounded w-52 h-14 flex justify-center items-center text-center border border-red-200'
                onChange={handleNameChange}
            />
            <button onClick={test2} className='w-52 h-8 border border-black rounded mt-2 active:bg-red-200'>
                Enter
            </button>
 
        </div>)}
        </div>

    )
}