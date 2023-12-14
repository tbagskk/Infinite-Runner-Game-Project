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
            setNamePath("Contact");
        } else {
            setNamePath("Return to game");
        }

    };

    const changePath = () => {
        if (location.pathname === "/infos"){
            setPath("/")
        } else if (location.pathname === "/"){
            setPath("/infos");
        } else {
            setPath("/");
        }
    };

    useEffect(() => {
        changePath();
        changeNamePath();
    },[]);

    return(
        <div className="containerHeader">
            <div className="logoHeader">
            <Link className="linkLogo" to="/" >
                <img className="imgLogo" src={logo}/>
            </Link>
            </div>
            <div className="menuHeader">
                <Link  className="buttonHeader" to={path} >{namePath}</Link>
                <Link  className="buttonHeader" to="/about" >About us</Link>
            </div>
        </div>
    )
}

/*  <Link className="buttonHeader" to="/">Game</Link> */