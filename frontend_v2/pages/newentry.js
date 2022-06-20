import React, {useState, useEffect} from 'react'
import styles from '../styles/Newentry.module.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'
import Link from 'next/link'

export default function NewTree() {

    const regions = ['Metropolitana', 'Arica', 'Antofagasta', 'Valparaiso', 'Los Rios', 'Los Lagos', 'Magallanes']
    const metroCities = ['Santiago']
    const ariCities = ['Ciudad de Arica', 'Parinacota', 'Putre']
    const antoCities = ['Ciudad de Antofagasta', 'Ciudad de Calama', 'Ciudad de Tocopilla']
    const valpoCities = ['Viña del Mar', 'Valparaiso', 'Quillota']

    const [initialPosition, setInitialPosition] = useState({lat:null, lng:null})

    useEffect(() => {
        console.log(initialPosition);
      }, [initialPosition]);
    

    const setLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const newPos = {              
                lat: position.coords.latitude,
                lng: position.coords.longitude
            } 
            
            if(newPos) {
                setInitialPosition(newPos);
                console.log(initialPosition)
            }
        }
    )}

    function handleTakePhoto(dataUri) {
        console.log("click");
    }

    async function saveTree(tree) {
        const response = await fetch('api/newentry', {
            method: 'POST',
            body: JSON.stringify(tree)
        });
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    }

// REMEMBER TO MOVE TO A COMPONENT LATER

    useEffect(() => {
        console.log(initialPosition)
    },[initialPosition])

    return (
    <>
        <Link href={'/reactmap'}>
            <button style={{border:'solid black 2px', width:'200px', margin:'20px'}}> Back </button>
        </Link>
        <div className='flex flex-col md:flex-row lg:flex-row w-100 h-100 '>

            <div className={styles.imageContainer}>
                <div className={styles.imageShadow}>
                    <div className={styles.cameraContainer}>
                        <Camera className={styles.camera} style="display:inline-block" idealResolution = {{width: 320, height: 240}} isFullscreen={false} onTakePhoto={(dataUri) => {handleTakePhoto(dataUri)}}> </Camera>
                    </div>
                </div>
                <div className={styles.imageUpload}>
                    <div className={styles.buttonFrame}>
                        <button className={styles.uploadButton}></button>
                    </div>
                </div>
            </div>
            <div className='ml-4 p-4'>
                <h2>Info</h2>
                <div>
                
                    <div> 
                        <form className='flex flex-col justify-between'>
                            <label htmlFor='region'>Region:
                                {/* <select multiple={true} value={['A', 'B']}></select> */}
                                <input type={"text"}></input>
                            </label>
                            {/* <label htmlFor="city">City: 
                                <input type={"text"}></input>
                            </label> */}
                            <label htmlFor="municipality">Municipality: 
                                <input type={"text"}></input>
                            </label>
                            <label htmlFor="park">Park: 
                                <input type={"text"}></input>
                            </label>
                            <label htmlFor='image'>Photo:
                                <input type={'text'}></input>
                            </label>
                            <label htmlFor="latitude">Latitude:
                                <input type={'text'} value={initialPosition.lat}/>
                            </label>
                            <label htmlFor="longitude">Longitude:
                                <input type={'text'} value={initialPosition.lng}/>
                            </label>
                        </form>
                        <button className='border-solid border-2 border-black' onClick={() => {setLocation()}}>Set coordinates</button>
                        <button className='ml-5 border-solid border-2 border-black'>
                            <input type={"submit"}></input>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
