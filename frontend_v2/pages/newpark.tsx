import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/Newentry.module.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'
import Link from 'next/link'
import AddParkForm from '../components/AddNewParkForm'
import { PrismaClient, Tree, Prisma, GreenArea } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(){
    const greenAreas: GreenArea[] = await prisma.greenArea.findMany();
    
    return {
        props: {
            initialPark: JSON.parse(JSON.stringify(greenAreas))
        }
    };
}



async function savePark(greenArea: Prisma.GreenAreaCreateInput) {
    const response = await fetch('api/newpark', {
        method: 'POST',
        body: JSON.stringify(greenArea)
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    } else (console.log("nice!"))

    return await response.json();
}


export default function NewPark({initialPark}) {
    
    const [greenAreas, setGreenAreas] = useState(initialPark)

    const formRef = useRef();

    function handleTakePhoto(dataUri) {
        console.log("click");
    }

    useEffect(()=>{
        console.log(greenAreas)
    })

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
                        <AddParkForm 
                            onSubmit={ async (data) => {
                                console.log("NOPE")
                                console.log(data)
                                try {
                                    await savePark(data);
                                    setGreenAreas([...greenAreas, data]);
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
