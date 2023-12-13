import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../Images/CLIKS.png'
import './Header.css';

export default function Header(){

    const location = useLocation();
    const [path, setPath] = useState("");
    const [namePath, setNamePath] = useState("");
    

    const changeNamePath = () => {

        if (location.pathname === "/infos"){
            setNamePath("Return to game")
        } else if (location.pathname === "/"){
            setNamePath("Submit Suggestion");
        }

    };

    const changePath = () => {
        if (location.pathname === "/infos"){
            setPath("/")
        } else if (location.pathname === "/"){
            setPath("/infos");
        }
        console.log(location.pathname);
    };

    useEffect(() => {
        changePath();
        changeNamePath();
        console.log(path);
    },[]);

    return(
        <div className="containerHeader">
            <div className="logoHeader">
                <img className="imgLogo" src={logo}/>
            </div>
            <div className="menuHeader">
                
              
                <Link  className="buttonHeader" to={path} >{namePath}</Link>
            </div>
        </div>
    )
}

/*  <Link className="buttonHeader" to="/">Game</Link> */