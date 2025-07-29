import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateArt from './components/CreateArt';
import UpdateArt from './components/UpdateArt';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateArt />} />
          <Route path='/update/:id' element={<UpdateArt />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
