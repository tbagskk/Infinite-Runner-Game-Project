import FranceFlag from './francepng.png';
import Flag2 from './allemagne.svg';

export default function CountryScript(canvasId) {

    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');

    const image1 = new Image();
    image1.src = FranceFlag;

    const image2 = new Image();
    image2.src = Flag2;

    let scale = 1;
    const maxScale = 1.3;
    const minScale =1;

    const x1 = (canvas.width - 100) / 4;
    const y1 = (canvas.height - 100) / 2;

    const x2 = (canvas.width - 100) * 3 / 4 ;
    const y2 = (canvas.height - 100) / 2;

    function drawGrid(){

        context.clearRect(0, 0, canvas.width, canvas.height);

        const width = canvas.width;
        const height = canvas.height;
        const gridSize = 40;

        context.lineWidth = 0.2;
        context.strokeStyle = 'black';

        context.save();
        context.scale(scale, scale);

        for (let y = 0; y <= height; y += gridSize)
        {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();

        }
        for (let x = 0; x <= width; x += gridSize) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
          }
        
        context.restore();
    }

    function handleWheel(event) {
        const delta = event.deltaY;
        const zoomIntensity = 0.0001; // Intensité du zoom
        const zoomDelta = delta * zoomIntensity;
    
        scale = Math.min(Math.max(scale + zoomDelta / scale, minScale), maxScale);
    
        const rect = canvas.getBoundingClientRect();
        const mouseX = (event.clientX - rect.left) / scale; // Ajustez en fonction de l'échelle
        const mouseY = (event.clientY - rect.top) / scale; // Ajustez en fonction de l'échelle
        const offsetX = mouseX - mouseX * scale;
        const offsetY = mouseY - mouseY * scale;
    
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(offsetX, offsetY);
        context.scale(scale, scale);
        drawGrid();
        circle(x1, y1, image1);
        circle(x2, y2, image2);
        context.restore();
    }
    

    function circle(x, y, flag){

        const imageWidth = 100;
        const imageHeight =100;
        // const x = (canvas.width - imageWidth) / 4;
        // const y = (canvas.height - imageHeight) / 2;

        context.save();
        context.beginPath();
        context.arc(x + imageWidth / 2, y + imageHeight / 2, imageWidth / 2, 0, 2 * Math.PI);
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
        context.closePath();
        context.clip();
        context.drawImage(flag, x , y, imageWidth, imageHeight);
        context.restore();
    }



    window.onload = function() {
        drawGrid(canvasId);
        circle(x1, y1, image1);
        circle(x2, y2, image2);
    }

    return {
        handleWheel: handleWheel,
            
        
    };


}