import React, {useState, useEffect} from 'react'
// import { Icon } from '@iconify/react'
import './Upload.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'

export default function Upload() {

    const [initialPosition, setInitialPosition] = useState({lat:null, lng:null})
    
    const [lat, setLat] = useState(0)

    const [lng, setLng] = useState(0)

    function setLocation () {
        navigator.geolocation.getCurrentPosition((position) => {
            const newPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            } 
            setInitialPosition(newPos);
            console.log(initialPosition)
        }
    )}

    useEffect(() => {
        console.log(lat)
    }, [])

    function handleTakePhoto(dataUri) {
        console.log("click");
    }

    return (
    <div className='upload-container'>
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
                <form>
                    <p>Details:</p> 
                    <textarea rows={4} cols={40}></textarea>
                    <input type={"submit"}></input>
                </form>
            </div>
        </div>
    </div>
  )
}
