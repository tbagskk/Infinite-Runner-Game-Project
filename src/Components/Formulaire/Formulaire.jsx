import React, { useState } from 'react';
import axios from 'axios';
import './Formulaire.css';
import config from '../Config';

export default function Formulaire(){

    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        validateForm(newName, msg);
    }

    const handleMsgChange = (e) => {
        const newMsg = e.target.value;
        const isValid = validateInput(newMsg);
        setMsg(newMsg);
        validateForm(name, newMsg);
    }

    const validateInput = (input) => {
        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(input);
      };

    const validateForm = (newName, newMsg) => { 
        const isValid = newName.trim() !== '' && newMsg.trim() !== '';
        setIsValid(isValid);
    }

    const handleSubmit = async () => {
        setMsg("");
            setName("");

        if (name)
        try {
            await axios.post(config.apiUrl + config.endpointInfos, {
                name: name,
                msg: msg,
            });
            
        } catch(error) {
            console.error('Error lors de la requête POST:', error);
        }
    }


    return (
        <div className='containerForm'>
            <div className='form'>
                <div className='formTop'>
                    <p className='formPTitle'>Reach me !</p>
                </div>
                
                <div className='formBottom'>
                <div className='pForm'>
                <p> 
Give me suggestions for game improvements or things you would like to see.</p></div>

                    <input 
                    className='inputForm'
                    placeholder='Your name (Use the same name to play)'
                    value={name}
                    onChange={handleNameChange}
                    >
                    </input>

                    <textarea className='inputForm' 
                    placeholder='Your suggestions'
                    value={msg}
                    onChange={handleMsgChange}
                    id="input2">
                    </textarea>

                    <button className='buttonForm' onClick={handleSubmit} disabled={!isValid}>
                        Send
                    </button>

                </div>
            </div>

        </div>
    )
}