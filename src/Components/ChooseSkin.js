import Img1 from './../Images/pixel3.png';
import Img2 from './../Images/turtle1.png';
import Img3 from './../Images/pixel2.png';

const skin1 = new Image();
const skin2 = new Image();
const skin3 = new Image();

skin1.src = Img1;
skin2.src = Img2;
skin3.src = Img3;

export  function chooseSkin(skin)
    {
        if (skin === 1)
            return (skin1);
        else if (skin === 2)
            return (skin2);
        else if (skin === 3)
            return (skin3);
    }

export function chooseSkinReact(skin){
        if (skin === 1)
            return (Img1);
        else if (skin === 2)
            return (Img2);
        else if (skin === 3)
            return (Img3);
}

export function chooseSkinReactStr(skin){
    if (skin === "default_skin")
        return (Img1);
    else if (skin === "2")
        return (Img2);
    else if (skin === "3")
        return (Img3);
}