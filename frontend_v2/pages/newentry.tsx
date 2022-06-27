import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/Newentry.module.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'
import Link from 'next/link'
import AddTreeForm from '../components/AddNewTreeForm'
import { PrismaClient, Tree, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(){
    const trees: Tree[] = await prisma.tree.findMany();

    return {
        props: {
            initialTrees: trees
        }
    };
}

async function saveTree(tree: Prisma.TreeCreateInput) {
    const response = await fetch('api/newentry', {
        method: 'POST',
        body: JSON.stringify(tree)
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export default function NewTree({initialTree}) {

    const [initialPosition, setInitialPosition] = useState({lat:null, lng:null})

    const [trees, setTree] = useState(initialTree)
    

    const formRef = useRef();

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

            {/* <div className={styles.imageContainer}>
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
            </div> */}
            <div className='ml-4 p-4'>
                <h2>Info</h2>
                <div>
                
                    <div ref={formRef}> 
                        <AddTreeForm 
                            onSubmit={ async (data, e) => {
                                try {
                                    await saveTree(data);
                                    setTree([...trees, data]);
                                    e.target.reset();
                                } catch (err) {
                                    console.log(err)
                                }
                            }}/>
                        {/* <form className='flex flex-col justify-between' >
                            <label htmlFor='region' name='region'>Region:
                                <input type={"text"}></input>
                            </label>
                            <label htmlFor="municipality" name="municipality">Municipality: 
                                <input type={"text"}></input>
                            </label>
                            <label htmlFor="park" name="park">Park: 
                                <input type={"text"}></input>
                            </label>
                            <label htmlFor='image' name="image">Photo:
                                <input type={'text'}></input>
                            </label>
                            <label htmlFor="latitude" name="latitude">Latitude:
                                <input type={'text'} value={initialPosition.lat}/>
                            </label>
                            <label htmlFor="longitude" name="longitude">Longitude:
                                <input type={'text'} value={initialPosition.lng}/>
                            </label>
                        </form> */}
                        <button className='border-solid border-2 border-black' onClick={() => {setLocation()}}>Set coordinates</button>

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
