import { Routes , Route} from 'react-router-dom';

import './App.css';
import './helpers/normalize.css';
import Videogames from './containers/Videogames';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<Videogames/>} />
      </Routes>
    </div>
  );
}

export default App;
