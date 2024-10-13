import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import TestSockets from './Components/RealGame/RealGame.jsx';
import './App.css';
import Header from './Components/Header/Header.jsx';
import Formulaire from './Components/Formulaire/Formulaire.jsx';
import About from './Components/About/About.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerMenu from './Components/PlayerMenu/PlayerMenu.jsx';
import Profil from './Components/Profil/Profil.jsx';
import { SocketProvider } from './SocketContext';
import { StrictMode } from 'react'


const AccueilPage = () => (
  <>
    <Header />
    <TestSockets />
  </>
);

const FormulaireComponent = () => (
  <>
    <Header />
    <Formulaire/> 
  </>
);

const AboutComponent = () => (
  <>
    <Header />
    <About />

  </>
);

const PlayerMenuComponent = () => (
  <>
    <Header />
    <PlayerMenu />
  </>
)

const ProfilComponent = () => (
  <>
    <Header />
    <Profil />
  </>
)




function App() {

  useEffect(() => {
    console.log("rendu");
  },[]);
  return (
    <SocketProvider>
    <Router>
      <Routes>
        <Route path="/infos" element={<FormulaireComponent/>} />
        <Route path="/" element={<PlayerMenuComponent />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/accueil" element={<PlayerMenuComponent />} />
        <Route path="/profil" element={<ProfilComponent />} />
        <Route path="/game" element={<AccueilPage />} />
      </Routes>
    </Router>
    </SocketProvider>
  );
}

export default App;
