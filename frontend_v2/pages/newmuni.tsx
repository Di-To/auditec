import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/Newentry.module.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'
import Link from 'next/link'
import AddMuniForm from '../components/AddNewMuniForm'
import { PrismaClient, Tree, Prisma, GreenArea, Municipality } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(){
    const munis: Municipality[] = await prisma.municipality.findMany();
    
    return {
        props: {
            initialPark: JSON.parse(JSON.stringify(munis))
        }
    };
}



async function saveMuni(municipios: Prisma.MunicipalityCreateInput) {
    const response = await fetch('api/newmuni', {
        method: 'POST',
        body: JSON.stringify(municipios)
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    } else (console.log("nice!"))

    return await response.json();
}


export default function NewMuni({initialMuni}) {
    
    const [municipy, setMunicipy] = useState(initialMuni)

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
                        <AddMuniForm 
                            onSubmit={ async (data) => {
                                console.log("NOPE")
                                console.log(data)
                                try {
                                    await saveMuni(data);
                                    setMunicipy([...municipy, data]);
                                    console.log("hey");
                                    console.log(data);
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
