import './App.css';
import Example from './Components/NavBar/NavBar';
import ReactMap from './Components/ReactMap/ReactMap';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ErrorPage from './Components/ErrorPage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Example/>
      <div className="App-header">
        
          <Routes>
            <Route path='/map' element={<ReactMap/>} />
            <Route path='*' element={<ErrorPage/>} />

          </Routes>
        
      </div>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
