import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';
import Seaded from './pages/Seaded';
import Meist from './pages/Meist';
import Poed from './pages/Poed';
import Koduleht from './pages/Koduleht';
import Pildid from './pages/Pildid';
import YksikToode from './pages/YksikToode';
import HaldaTooteid from './pages/HaldaTooteid';
import MuudaToode from './pages/MuudaToode';

function App() {
  return (
    <div className="App">
      <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
      <button className="nupp">Nupp</button>

      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Link to="lisa-toode">
        <button>Lisa uus toode</button>
      </Link>
      <Link to="seaded">
        <button>Lehe seaded</button>
      </Link>
      <Link to="meist">
        <button>Info meist</button>
      </Link>
      <Link to="poed">
        <button>Meie poed</button>
      </Link>
      <Link to="pildid">
        <button>Pildid</button>
      </Link>
      <Link to="halda-tooteid">
        <button>Halda tooteid</button>
      </Link>

      <Routes>
        <Route path="" element={ <Koduleht /> } />
        <Route path="avaleht" element={ <Avaleht /> } />
        <Route path="ostukorv" element={ <Ostukorv /> } />
        <Route path="lisa-toode" element={ <LisaToode /> } />
        <Route path="seaded" element={ <Seaded /> } />
        <Route path="meist" element={ <Meist /> } />
        <Route path="poed" element={ <Poed /> } />
        <Route path="pildid" element={ <Pildid /> } />
        <Route path="toode/:nimi" element={ <YksikToode /> } />
        <Route path="halda-tooteid" element={ <HaldaTooteid /> } />
        <Route path="muuda/:tooteNimi" element={ <MuudaToode /> } />
      </Routes>
    </div>
  );
}

export default App;
