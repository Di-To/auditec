import logo from './logo.svg';
import './App.css';
import Example from './Components/NavBar/NavBar';
import ReactMap from './Components/ReactMap';

function App() {
  return (
    <div className="App">
      <Example/>
      <div className="App-header">
        <ReactMap/>
      </div>
      
    </div>
  );
}

export default App;
