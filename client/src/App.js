import { Routes , Route} from 'react-router-dom';

import './App.css';
import './helpers/normalize.css';
import Videogames from './containers/Videogames';
import VideogameCard from './components/VideogameList/index';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<VideogameCard/>} />
      </Routes>
    </div>
  );
}

export default App;
