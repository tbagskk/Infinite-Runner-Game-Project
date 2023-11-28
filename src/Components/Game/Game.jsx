// App.js
import React, { useEffect , useRef} from 'react';
import GameJs from './Game.js';

export default function Game() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const app = GameJs();

    return () => {
        app.destroy(true);
    };
  }, []);

  return (

    <div className='bg-red-200 w-full h-full flex justify-center items-center'>
      {/* <div  className=' bg-black  flex justify-center items-center 'style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }} id="containerId">

      </div> */}
      <canvas
                        id = "containerId"
                        ref={canvasRef}
                        width={1000}
                        height={500}
                        style = {{width: '100%', height: '100', overflow: 'hidden', position: 'relative' }} 
                        className="border bg-white rounded black"
                />
      </div>
      

  );
}

