import React from 'react';
import 'tailwindcss/tailwind.css';
import TestSockets from './Components/RealGame/RealGame.jsx';
import './App.css';
import Header from './Components/Header/Header.jsx';
import Formulaire from './Components/Formulaire/Formulaire.jsx';
import About from './Components/About/About.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/infos" element={<FormulaireComponent/>} />
        <Route path="/" element={<AccueilPage />} />
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
