import React from 'react';
import 'tailwindcss/tailwind.css';
import TestSockets from './Components/RealGame/RealGame.jsx';
import './App.css';
import Header from './Components/Header/Header.jsx';
import Formulaire from './Components/Formulaire/Formulaire.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const AccueilPage = () => (
  <div className="h-screen flex flex-col" id="appp">
    <Header />
    <TestSockets />
  </div>
);

const FormulaireComponent = () => (
  <>
    <Header />
    <Formulaire/> 
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/infos" element={<FormulaireComponent/>} />
        <Route path="/" element={<AccueilPage />} />
      </Routes>
    </Router>
  );
}

export default App;
