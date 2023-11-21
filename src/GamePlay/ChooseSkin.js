import FrImg from './../Images/francepng.png';
import Img3 from './../Images/chat2.png';
import Img4 from './../Images/red.png';

const skinFrance = new Image();
const skin2 = new Image();
const skin3 = new Image();

skinFrance.src = FrImg;
skin2.src = Img3;
skin3.src = Img4;

export default function chooseSkin(skin)
    {
        if (skin === "default_skin")
            return (skinFrance);
        else if (skin === "2")
            return (skin2);
        else if (skin === "3")
            return (skin3);
    }