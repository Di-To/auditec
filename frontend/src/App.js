import './App.css';
import Example from './Components/NavBar/NavBar';
import ReactMap from './Components/ReactMap/ReactMap';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ErrorPage from './Components/ErrorPage';
import TreeDetails from './Components/ReactMap/TreeDetails/TreeDetails';
import { useEffect, useState } from 'react';
import Upload from './Components/ReactMap/TreeDetails/Upload/Upload';
import NewTree from './Components/ReactMap/NewTree/NewTree';


function App() {

  const [treeId, setTreeId] = useState(null)
  
  const sendIdToAppJs = (data) => {
    console.log(data);
    setTreeId(data)
  }


  return (
    <BrowserRouter>
    <div className="App">
      <Example/>
      <div className="App-header">
        
          <Routes>
            <Route path='/map' element={<ReactMap sendIdToAppJs={sendIdToAppJs}/>} />
            <Route path='*' element={<ErrorPage/>} />
            <Route path='/treedetails/:id' element={<TreeDetails treeId={treeId} />} />
            <Route path='/treedetails/:id/upload' element={<Upload treeId={treeId} />}/>
            <Route path='/newtree' element={<NewTree/>}/>
          </Routes>
        
      </div>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
