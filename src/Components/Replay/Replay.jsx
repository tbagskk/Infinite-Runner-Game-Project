import React, { useRef, useEffect, useState } from 'react';



export default function RePlay({RePLay}){



    const PlayAgain = () => {
        // RePlay();
    };

    useEffect(() => {
       
         const handleWheel = (event) => {
            if (event.code === 'Space' || event.code === 'ArrowUp') {
    
              }
        };

        window.addEventListener('keydown', handleWheel);

        return () => {
            window.removeEventListener('keydown', handleWheel);
        };
    },[]);

    


    return (
        <button onClick={PlayAgain} className='rounded border border-black absolute flex justify-center items-center h-12 w-28'>
                Play
            </button>)
    
}