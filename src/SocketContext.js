import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import config from './Components/Config';
import Cookies from 'js-cookie';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const name = Cookies.get("name");

    const connectToServer = () => {
        const newSocket = io(config.apiUrl, {
            path: '/socket.io',
        });
        setSocket(newSocket);
        newSocket.emit("name", name);
    };

    useEffect(() => {
        connectToServer();
        console.log("ca passe")
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
