import 'tailwindcss/tailwind.css';
import Home from './Components/Home/Home.jsx';
import Dino from './Components/Dino/Dino.jsx';
import Country from './Components/Country/Country.jsx';
import TestSockets from './Components/RealGame/RealGame.jsx';
import './App.css';

function App() {
  return (
    <div className="h-screen flex flex-col" >
      
    <TestSockets/>
    </div>
  );
}

export default App;
