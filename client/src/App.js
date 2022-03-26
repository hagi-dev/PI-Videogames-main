import { Routes , Route} from 'react-router-dom';

import './App.css';
import './helpers/format/normalize.css';
import Videogames from './pages/Videogames';
import Background from './assets/img/background.png';
import Videogame from './pages/Videogame';
import CreateVideogame from './pages/CreateVideogame';
import LandingPage from './pages/LandingPage/index';


function App() {
  return (
    <div className="App" style={background_image}>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Videogames/>} />
        <Route exact path="/videogames/:id" element={<Videogame/>} />
        <Route exact path="/videogame/create" element={<CreateVideogame/>} />
      </Routes>
    </div>
  );
}

export default App;



const background_image = {
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  color: "white",
};
