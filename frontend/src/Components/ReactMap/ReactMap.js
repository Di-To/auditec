import React, {useState, useEffect} from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
import dataSet from '../../MockData'
import './ReactMap.css'


let cardPoints = dataSet.map(item => { return {latitude: item.lat , longitude: item.lng, id: item.id, grade: item.grade }}) 

let locations = []

locations = locations.concat(cardPoints)

// const [treeId, setTreeId] = useState(0);

export default function ReactMap() {
  
    const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGl0b2xlZG9yIiwiYSI6ImNsM3E1OHR5ZjA5NTYzY21zaG8xeGJxMHgifQ.quteS-bAH31Y61dhDnnClw'

    const [viewport, setViewport] = useState({
      latitude: 51.9271764,
      longitude: -8.5991461,
      zoom: 10
  })   

    const [selectedTree, setSelectedTree] = useState(dataSet[1])
    const [showPopup, setShowPopup] = useState(false)

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
                    setShowPopup(true);
                  }}>
                    <img src='./logo512.png'></img>
                  </button>
                </Marker>
              ))
            }

            {
                selectedTree === dataSet[selectedTree.id] ? (
                  <Popup className='popup' key={selectedTree.id} latitude={selectedTree.lat} longitude={selectedTree.lng} anchor="bottom"
                  onClose={() => setShowPopup(false)}>
                    Treeeeeeeeeeeeeeee
                  </Popup>
                // <div className='popup'>
                //   Treeeeeeeeeeeeeeee
                // </div>
                // console.log([selectedTree, selectedTree.lng, selectedTree.lat])
              ) : null
            }

            
              
                {/* <Marker 
                latitude={dataSet[0].lat} longitude={dataSet[0].lng} style={{width:'30px', height:'30px', backgroundColor:"red"}}>
                  <img src='./logo512.png'></img>
                </Marker>
               */}

        </Map>
    </div>
  )
}
