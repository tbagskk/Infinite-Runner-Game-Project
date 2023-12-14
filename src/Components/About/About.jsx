import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './About.css';

export default function About(){
    return (
    <div className='containerAbout'>
        <div className='containerInfos'>
            <div className='titleAbout'>
                About us
            </div>
            <div className='bodyAbout'>
                <p className='pAbout'>
                    Next update :
                </p>
           
                <p className='pAbout'>
                    - Implementation of a coin collection system to purchase new skins.
                    <br/>
                    - Introduction of individual accounts (with a guest mode always available).
                    <br/>
                    - Establishment of a flame system to maintain (by logging in every day).
                    <br/>
                    - Addition of skins with different functionalities.
                    
                </p>
            
                <p className='pAbout'>
                   Share your ideas :
                </p>
               
                <p className='pAbout'>
                    - The game is currently in the alpha development phase. Feel free to send me your suggestions. In the case of a large number of ideas, a vote will be organized to select the best one, which I will then develop.
                    <br/>
                    - Submit your ideas for skins to implement.
                </p>
              
                <p className='pAbout'>
                Bug reporting :
                </p>
             
                <p className='pAbout'>
                    - The game is not yet responsive (accessible on mobile phones), but this feature will be added soon (and possibly even an application! Share your opinions!).
                    <br/>
                    - Please report any bugs you find so that I can fix them.
                </p>
       
                <p className='pAbout'>
                    Rewards :
                </p>
            
                <p className='pAbout'>
                    - As alpha testers, when individual accounts are implemented, you will all receive gifts in advance.
                    <br/>
                    - A referral system is being considered to reward those who invite other players.
                </p>

                
            </div>
            <div className='containerButtonAbout'><Link  className="buttonAbout" to='/infos' >Give me your ideas</Link></div>

        </div>
    </div>
    )
}