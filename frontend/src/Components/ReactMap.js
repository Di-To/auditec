import React, {useState} from 'react'
import Map from 'react-map-gl'

export default function ReactMap() {
  
    const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGl0b2xlZG9yIiwiYSI6ImNsM2UzanA0MTBibzIzam9mZmcxamF0NnoifQ.cjp1eijdRJ9J2n8h1V0l5g'

    const [viewPort, setViewPort] = useState({
      latitude: 45.4211,
      longitude: -75.6903,
      width: '100%',
      height: '100%',
      zoom: 10
  })   

  return (
    <div style={{border: "solid 2px black", width:"60vw", height:"60vh"}}>
        <Map {...viewPort} mapStyle="mapbox://styles/mapbox/streets-v9" mapboxAccessToken={MAPBOX_TOKEN}>
            markers
        </Map>
    </div>
  )
}
