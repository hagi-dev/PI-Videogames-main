import { Routes , Route} from 'react-router-dom';

import './App.css';
import './helpers/format/normalize.css';
import Videogames from './containers/Videogames';
import Background from './assets/img/background.png';
import Videogame from './containers/Videogame';
import CreateVideogame from './containers/CreateVideogame';
import LandingPage from './containers/LandingPage/index';


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
