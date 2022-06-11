import React, {useState, useEffect} from 'react'
import styles from '../styles/Newtree.module.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'
import Link from 'next/link'

export default function NewTree() {

    const [initialPosition, setInitialPosition] = useState({lat:null, lng:null})

    const setLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const newPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            } 
            setInitialPosition(newPos);
            console.log(initialPosition)
        }
    )}

    // useEffect(() => {
    //     console.log({id})
    // }, [])

    function handleTakePhoto(dataUri) {
        console.log("click");
    }

    return (
    <div>
        <Link href={'/reactmap'}>
            <button style={{border:'solid black 2px', width:'200px', margin:'20px'}}> Back </button>
        </Link>
        <div className='flex flex-col md:flex-row lg:flex-row w-100 h-100 '>

            <div className='image-container border'>
                <div className='image-shadow'>
                    <div className='camera-container'>
                        <Camera className="camera" style="display:inline-block" idealResolution = {{width: 320, height: 240}} isFullscreen={false} onTakePhoto={(dataUri) => {handleTakePhoto(dataUri)}}> </Camera>
                    </div>
                </div>
                <div className='image-upload'>
                    <div className='button-frame'>
                        <button className='upload-button' onClick={() => {setLocation()}}></button>
                    </div>
                </div>
            </div>
            <div className='report-container border'>
                <h2>Info</h2>
                <div className='inner-info-container'>
                
                    <div> 
                        <form>
                            Park: <input type={"text"}></input>  
                        </form>
                        <form>
                            Grade: <input type={"text"}></input>
                        </form>
                        <form>
                            Latitude: {initialPosition.lat}
                        </form>
                        <form>
                            Longitude: {initialPosition.lng}
                        </form>
                    </div>

                    <form>
                        <p>Details:</p>     
                        <textarea rows={4} cols={40}></textarea>
                        <button>
                            <input type={"submit"}></input>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
