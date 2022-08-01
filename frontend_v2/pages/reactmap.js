import React, {useState, useEffect} from 'react'
import Map, {Marker, Popup} from 'react-map-gl'
import styles from '../styles/Reactmap.module.css'
import "mapbox-gl/dist/mapbox-gl.css"
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export async function getServerSideProps(){
  // 
  const trees = await prisma.tree.findMany({
    include: {
      details: true,
    }
  });

  return {
    props: {
      initialTrees: JSON.parse(JSON.stringify(trees))
    }
  }
}


export default function ReactMap({initialTrees}) {

    const { data: session, status } = useSession()
    const loading = status === "loading"


    useEffect(()=> {
      console.log("this are the details")
      console.log(initialTrees[2].details)
    })

    const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGl0b2xlZG9yIiwiYSI6ImNsM3E1OHR5ZjA5NTYzY21zaG8xeGJxMHgifQ.quteS-bAH31Y61dhDnnClw'

    const [viewport, setViewport] = useState({
      latitude: initialTrees[0].latitude,
      longitude: initialTrees[0].longitude,
      zoom: 10
  })   

  const [fetchedData, setFetchedData] = useState([])

  // useEffect(() =>{
  //   fetch('/api/reactmap')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFetchedData(data.dataSet)
  //     }) 
  // },[])  
  
  useEffect(()=>{
    console.log(initialTrees)
  })
  
  const [selectedTree, setSelectedTree] = useState(fetchedData[0])
    
  return (

    <>
      {loading && <h1>loading...</h1>}
      { session &&
      <div className={styles.mapPage}>
        <div className={styles.mapContainer}>
            <Map {...viewport} 
                mapboxAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onMove={evt => setViewport(evt.viewport)}>

                {/* getting data from database and displaying it on the map */}
                {
                  initialTrees.map(tree => {
                    
                    const treeDetails = tree.details.length - 1

                    return (
                    <Marker 

                      key={tree.id} latitude={tree.latitude} longitude={tree.longitude} >
                      
                      <button className={`${styles.button} ${tree.details[treeDetails].grade > 3 ? styles.greenButton : tree.details[treeDetails].grade === 3 ? styles.yellowButton : styles.redButton}`} onClick={(e) => {
                              e.preventDefault();
                              setSelectedTree(tree);
                              console.log(tree.details)
                              // sendIdToAppJs(tree.id)
                            }}> </button>
                                          
                    </Marker>
                    )
                  })
                }

    {/* Popup showin info from the provided trees */}
                {
                  selectedTree ? (
                      <Popup className={styles.popup} key={selectedTree.id} latitude={selectedTree.latitude} longitude={selectedTree.longitude} anchor="bottom"
                      closeOnClick={false} closeOnMove={true}>
                        <div>
                          <h2>{selectedTree.park}</h2>
                          {/* <img src={selectedTree.src}></img> */}
                          <p>Grade: {selectedTree.details.grade}</p>
                          <p>Location: {selectedTree.park}</p>
                          <p>id: {selectedTree.id}</p>
                          
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
      }
      {!session && 
      <>
        <p className={{}}>Please Sign in</p>
               <img src="https://cdn.dribbble.com/userupload/2741522/file/original-635a5a001334ce8936501c5006fcbdcb.mp4" alt="" className={styles.avatar} />
               <p className={{}}>GIF by <a href="https://cdn.dribbble.com/userupload/2741522/file/original-635a5a001334ce8936501c5006fcbdcb.mp4">Another man</a> </p>
      </>
      }
    </>
                
    
  )
}
