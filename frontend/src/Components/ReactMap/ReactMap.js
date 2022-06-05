import React, {useState, useEffect} from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
import dataSet from '../../MockData'
import { Link } from 'react-router-dom'
import './ReactMap.css'



export default function ReactMap({sendIdToAppJs}) {

    const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGl0b2xlZG9yIiwiYSI6ImNsM3E1OHR5ZjA5NTYzY21zaG8xeGJxMHgifQ.quteS-bAH31Y61dhDnnClw'

    const [viewport, setViewport] = useState({
      latitude: 51.9271764,
      longitude: -8.5991461,
      zoom: 10
  })   

    const [selectedTree, setSelectedTree] = useState(dataSet[0])
    
  return (
    <div className='map-container'>
        <Map {...viewport} 
            mapboxAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onMove={evt => setViewport(evt.viewport)}>
            
            {
              dataSet.map(tree => (
                <Marker 
                  key={tree.id} latitude={tree.lat} longitude={tree.lng} >
                  
                  <button style={{width:'30px', height:'30px', backgroundColor:"blue"}} onClick={(e) => {
                    e.preventDefault();
                    setSelectedTree(tree);
                    sendIdToAppJs(tree.id)
                  }}>
                    {
                      selectedTree.grade > 3 ? (
                        <img src='./logo512.png'></img>
                      ) : selectedTree.grade === 3 ? (
                        <img src='./logo512.png'></img>
                      ) : (
                        <img src='./logo512.png'></img>
                      )
                    }
                    
                  </button>
                </Marker>
              ))
            }

            {
              selectedTree ? (
                  <Popup className='popup' key={selectedTree.id} latitude={selectedTree.lat} longitude={selectedTree.lng} anchor="bottom"
                  closeOnClick={false} closeOnMove={true}>
                    <div>
                      <h2>{selectedTree.treeName}</h2>
                      <img src={selectedTree.src}></img>
                      <p>Grade: {selectedTree.grade}</p>
                      <p>Location: {selectedTree.location}</p>
                      
                      <Link to={`/treedetails/${selectedTree.id}` }>
                        <button className='popup-button'>see more</button>
                      </Link>
                      
                    </div>
                  </Popup>
              ) : null
              }

        </Map>
    </div>
  )
}
