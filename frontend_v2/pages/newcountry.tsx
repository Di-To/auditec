import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/Newentry.module.css'
import ImageUploading from 'react-images-uploading'
import Camera from 'react-html5-camera-photo'
import Link from 'next/link'
import AddCountryForm from '../components/AddNewCountryForm'
import { PrismaClient, Tree, Prisma, GreenArea, Municipality, Country } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(){
    const country: Country[] = await prisma.country.findMany();
    
    return {
        props: {
            initialPark: JSON.parse(JSON.stringify(country))
        }
    };
}



async function saveCountry(pais: Prisma.CountryCreateInput) {
    const response = await fetch('/api/newcountry', {
        method: 'POST',
        body: JSON.stringify(pais)
    });
    
    if (!response.ok) {
        throw new Error(response.statusText);
    } else (console.log("nice!"))

    return await response.json();
}


export default function NewMuni({initialCountry}) {
    
    const [country, setCountry] = useState(initialCountry)

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
                        <AddCountryForm 
                            onSubmit={ async (data) => {
                                try {
                                    await saveCountry(data);
                                    setCountry([...country, data]);
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
