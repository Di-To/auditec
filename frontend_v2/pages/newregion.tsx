import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/Newentry.module.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'
import Link from 'next/link'
import AddRegionForm from '../components/addNewRegionForm'
import { PrismaClient, Tree, Prisma, GreenArea, Municipality, Country, Region } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(){
    const region: Region[] = await prisma.region.findMany();
    
    return {
        props: {
            initialRegion: JSON.parse(JSON.stringify(region))
        }
    };
}



async function saveRegion(region: Prisma.RegionCreateInput) {
    const response = await fetch('api/newregion', {
        method: 'POST',
        body: JSON.stringify(region)
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    } else (console.log("nice!"))

    return await response.json();
}


export default function NewRegion({initialRegion}) {
    
    const [region, setRegion] = useState(initialRegion)

    const formRef = useRef();

    function handleTakePhoto(dataUri) {
        console.log("click");
    }

    // useEffect(()=>{
    //     console.log(greenAreas)
    // })

// REMEMBER TO MOVE TO A COMPONENT LATER

    return (
    <>
        <Link href={'/reactmap'}>
            <button style={{border:'solid black 2px', width:'200px', margin:'20px'}}> Back </button>
        </Link>
        <div className='flex flex-col md:flex-row lg:flex-row w-100 h-100 '>

            <div className='ml-4 p-4'>
                <h2>Info</h2>
                <div>
                
                    <div> 
                        <AddRegionForm 
                            onSubmit={ async (data) => {
                                console.log("HEE")
                                console.log(data)
                                try {
                                    await saveRegion(data);
                                    setRegion([...region, data]);
                                } catch (err) {
                                    console.log(err)
                                }
                            }}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
