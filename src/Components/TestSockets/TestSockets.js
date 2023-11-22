import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

export default function TestSockets({}){

    const url = "http://localhost:3000";

   const [test, setTest] = useState(false);
   const [deco, setDeco] = useState(true);
   const socket = io('http://localhost:3000', {
    path: '/socket.io', // Assurez-vous que le chemin correspond
  });

   const Deco2 = () => {
    socket.disconnect();
    setTest(false);
    console.log("deco");
};

        const TestSocket = async () => {
            try {
                const Connexion = await axios.get(url);
                console.log(Connexion);
            }
            catch (error)
            {
                console.error("Erreur connexion Sockets");
            }
       

        }
        useEffect(()=> {
            // TestSocket();
           
            socket.on('userConnected', (message) => {
                console.log(message);
                if (message)
                    setTest(true);
              });
      
                
    },[]);
   
    return (
        <div className='absolute  h-5/6  w-full flex  items-end flex-row justify-start '>
        <div className=' absolute h-3/6 w-1/6 border border-slate-500 rounded md-text-sm text-base hidden sm:block text-left  text-left m-4 p-4'>
              <p className='mb-2 mt-2 font-bold'>Connexion<span className='text-green-600'></span></p>

            <div className=''>

            {test && <p>Connecté </p>}
    
            </div>

            <button onClick={Deco2} className='border border-black'>Deconnexion</button>

      
            
        </div>
        </div>
       
        

    )
}