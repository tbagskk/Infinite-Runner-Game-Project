import React, { useRef, useEffect, useState } from 'react';
import Dino from '../Dino/Dino.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';
import CountryScript from './Country.js';


export default function Country({}){

    const canvasRef = useRef(null);
    const canvaDraw = useRef(null);

    useEffect(() => {
        canvaDraw.current = CountryScript('country');

         const handleWheel = (event) => {
            const delta = event.deltaY;
            console.log("delta", delta);
            canvaDraw.current.handleWheel(event);
           
            
        };

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    },[]);

    


    return (
        <div className=' bg-slate-600 h-screen w-full flex justify-center items-center flex-row min-h-full'>
    
             <canvas
                        id = "country"
                        ref={canvasRef}
                        width={1000}
                        height={500}
                        style = {{width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }} 
                        className="border bg-white rounded black opacity-40"
                />
                <Dino/>
    
        </div>

    )
}