import React, {useState, useEffect} from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
// import daçtaSet from '../MockData'
import styles from '../styles/Reactmap.module.css'
import "mapbox-gl/dist/mapbox-gl.css"
import Link from 'next/link'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function getServerSideProps(){

  const trees = await prisma.tree.findMany();

  return {
    props: {
      initialTrees: JSON.parse(JSON.stringify(trees))
    }
  }
}


export default function ReactMap({initialTrees}) {


    const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGl0b2xlZG9yIiwiYSI6ImNsM3E1OHR5ZjA5NTYzY21zaG8xeGJxMHgifQ.quteS-bAH31Y61dhDnnClw'

    const [viewport, setViewport] = useState({
      latitude: initialTrees[0].latitude,
      longitude: initialTrees[0].longitude,
      zoom: 10
  })   

  const [fetchedData, setFetchedData] = useState([])

  useEffect(() =>{
    fetch('/api/reactmap')
      .then((res) => res.json())
      .then((data) => {
        setFetchedData(data.dataSet)
      }) 
    },[])  

  const [selectedTree, setSelectedTree] = useState(fetchedData[0])
    
  return (
    <div className={styles.mapPage}>
      <div className={styles.mapContainer}>
          <Map {...viewport} 
              mapboxAccessToken={MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              onMove={evt => setViewport(evt.viewport)}>

              {/* getting data from database and displaying it on the map */}
              {
                fetchedData.map(tree => (
                  
                  
                  <Marker 
                    key={tree.id} latitude={tree.lat} longitude={tree.lng} grade={tree.grade}>
                    
                      {
                        tree.grade > 3 ? (
                          <button className={`${styles.button} ${styles.greenButton}`} onClick={(e) => {
                            e.preventDefault();
                            setSelectedTree(tree);
                            // sendIdToAppJs(tree.id)
                          }}> </button>
                        ) : tree.grade === 3 ? (
                          <button className={`${styles.button} ${styles.yellowButton}`} onClick={(e) => {
                            e.preventDefault();
                            setSelectedTree(tree);
                            // sendIdToAppJs(tree.id)
                          }}> </button>
                        ) : (
                          <button className={`${styles.button} ${styles.redButton}`} onClick={(e) => {
                            e.preventDefault();
                            setSelectedTree(tree);
                            // sendIdToAppJs(tree.id)
                          }}> </button>
                        )
                      } 
                                        
                  </Marker>
                ))
              }

  {/* Popup showin info from the provided trees */}
              {
                selectedTree ? (
                    <Popup className={styles.popup} key={selectedTree.id} latitude={selectedTree.lat} longitude={selectedTree.lng} anchor="bottom"
                    closeOnClick={false} closeOnMove={true}>
                      <div>
                        <h2>{selectedTree.treeName}</h2>
                        <img src={selectedTree.src}></img>
                        <p>Grade: {selectedTree.grade}</p>
                        <p>Location: {selectedTree.location}</p>
                        
                        <Link href={`/treedetails/${selectedTree.id}` } key={selectedTree.id}>
                          <button className={styles.popupButton}>see more</button>
                        </Link>
                        
                      </div>
                    </Popup>
                ) : null
                }

          </Map>
          <Link href={'/newentry'}>
            <button className={styles.popupButton} style={{color:"black", marginTop:"20px"}}>New Entry</button>
          </Link>
      </div>
    </div>
  )
}
