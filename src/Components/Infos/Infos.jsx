import React, { useRef, useEffect, useState } from 'react';

export default function Infos({}){

   
    return (
        <div className='absolute  h-5/6  w-full flex  items-end flex-row justify-start '>
        <div className=' h-3/6 w-1/6 border border-slate-500 rounded md-text-sm text-base hidden sm:block text-left  text-left m-4 p-4'>
              <p className='mb-2 mt-2 font-bold'>Beta 0.1 <span className='text-green-600'>(current)</span></p>

            <div className=''>
            <p>- Fixed fps bugs on underpowered computers</p>
            <p>- Updated stitch system for faster performance</p>
            <p>- Made slight adjustments to the jump system</p>
            </div>

            <p className='mb-2 mt-2 font-bold'> <span className='text-red-600'>Information</span></p>

            <p>The phone version is not yet developed, so bugs are normal.</p>
      
            
        </div>
        </div>
       
        

    )
}